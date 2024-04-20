import "./style.css";
import IDW from "./idw.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import GUI from "lil-gui";
import * as THREE from "three";
import { dataSource } from "./data.js";
import { Lut } from "three/addons/math/Lut.js";
export function createLinearGradientCanvas() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 256;
  canvas.height = 256;
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height / 4);
  gradient.addColorStop(0, "#757373"); // 顶部颜色
  gradient.addColorStop(1, "#242323"); // 底部颜色
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function initDataByDataSource(dataSource) {
  let bbox = {
    minLat: Infinity,
    minLon: Infinity,
    minDepth: Infinity,
    maxDepth: -Infinity,
    maxLat: -Infinity,
    maxLon: -Infinity,
  };
  let centerPos = null;
  // 第一次遍历，找到bbox
  dataSource.forEach((ele) => {
    const lat = Number.parseFloat(ele.latitude);
    const lon = Number.parseFloat(ele.longitude);
    const depth = Number.parseFloat(ele.startDepth) * 9;
    bbox.minDepth = Math.min(depth, bbox.minDepth);
    bbox.maxDepth = Math.max(depth, bbox.maxDepth);
    bbox.maxLat = Math.max(lat, bbox.maxLat);
    bbox.maxLon = Math.max(lon, bbox.maxLon);
    bbox.minLat = Math.min(lat, bbox.minLat);
    bbox.minLon = Math.min(lon, bbox.minLon);
  });
  bbox.latRange = bbox.maxLat - bbox.minLat;
  bbox.lonRange = bbox.maxLon - bbox.minLon;
  bbox.depthRange = bbox.maxDepth - bbox.minDepth;
  // 找到centerPos
  centerPos = {
    lon: bbox.minLon + (bbox.maxLon - bbox.minLon) / 2,
    lat: bbox.minLat + (bbox.maxLat - bbox.minLat) / 2,
  };
  let result = [];
  dataSource.forEach((ele) => {
    let lat = Number.parseFloat(ele.latitude);
    let lon = Number.parseFloat(ele.longitude);
    lat = lat - bbox.minLat;
    lon = lon - bbox.minLon;
    result.push({
      ...ele,
      x: lat,
      y: lon,
      z: ele.startDepth * 9,
      value: Number.parseFloat(ele.cadmium),
    });
  });
  return {
    result,
    bbox,
  };
}
class App {
  constructor() {
    this.initApp();
    this.initGUI();
    this.initGeometry();
    this.addEventListener();
  }

  initGeometry() {
    // 1. 根据dataSource进行建模
    const { result, bbox } = initDataByDataSource(
      dataSource,
      this.params.scaleValue
    );
    this.bbox = bbox;
    this.dataSource = result;
    const positions = this.dataSource.map((ele) => [ele.x, ele.y, ele.z]);
    const vs = this.dataSource.map((ele) => ele.value);
    const maxv = Math.max(...vs);
    this.lut.setMax(maxv);
    this.lut.setMin(0);
    this.idw = new IDW(
      {
        positions: positions,
        values: vs,
      },
      {
        periodicExtent: [
          [0, bbox.latRange],
          [0, bbox.lonRange],
          [0, bbox.depthRange],
        ],
      }
    );
    //1.threeJS建模一个长方形
    this.geometry = new THREE.BoxGeometry(
      bbox.lonRange,
      bbox.latRange,
      bbox.depthRange
    );
    this.geometry.computeBoundingBox();
    const _this = this;
    const params = this.params;
    const voxelGeometry = new RoundedBoxGeometry(
      params.boxSize,
      params.boxSize,
      params.boxSize,
      2,
      params.boxRoundness
    );
    const voxelMaterial = new THREE.MeshBasicMaterial({});
    const modelVoxels = computedVoxel();
    const instanceMesh = createVoxel(modelVoxels);
    this.scene.add(instanceMesh);
    function createVoxel(voxels) {
      const dummy = new THREE.Object3D();
      const instanceMesh = new THREE.InstancedMesh(
        voxelGeometry,
        voxelMaterial,
        voxels.length
      );
      instanceMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      for (let i = 0; i < voxels.length; i++) {
        instanceMesh.setColorAt(i, voxels[i].color);
        dummy.position.copy(voxels[i].position);
        dummy.updateMatrix();
        instanceMesh.setMatrixAt(i, dummy.matrix);
      }
      instanceMesh.instanceMatrix.needsUpdate = true;
      instanceMesh.instanceColor.needsUpdate = true;
      return instanceMesh;
    }
    function computedVoxel() {
      const params = _this.params;
      let modelVoxels = [];
      let boundingBox = _this.geometry.boundingBox;
      boundingBox.min.y += 0.5 * params.resolution;
      for (
        let i = boundingBox.min.x;
        i < boundingBox.max.x;
        i += params.resolution
      ) {
        for (
          let j = boundingBox.min.y;
          j < boundingBox.max.y;
          j += params.resolution
        ) {
          for (
            let k = boundingBox.min.z;
            k < boundingBox.max.z;
            k += params.resolution
          ) {
            const pos = new THREE.Vector3(i, j, k);
            const predictValue = _this.idw.evaluate([pos.x, pos.y, pos.z], 3);
            // const color = new THREE.Color((predictValue / maxv) * 0xffffff);
            const color = _this.lut.getColor(predictValue);
            modelVoxels.push({ color: color, position: pos });
          }
        }
      }
      return modelVoxels;
    }
  }

  initApp() {
    this.lut = new Lut();
    this.lut.setColorMap("rainbow");
    const _this = this;
    this.params = {
      resolution: 15,
      modelPreviewSize: 2,
      modelSize: 9,
      gridSize: 0,
      boxSize: 14,
      boxRoundness: 0.03,
    };
    this.canvas = document.getElementById("renderingCanvas");
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    // Init gui
    this.gui = new GUI();
    this.gui.add(document, "title").name("案例名称");
    this.scene = new THREE.Scene();
    this.scene.background = createLinearGradientCanvas();
    // Init camera
    this.camera = new THREE.OrthographicCamera(
      -this.canvas.clientWidth / 2,
      this.canvas.clientHeight / 2,
      this.canvas.clientHeight / 2,
      -this.canvas.clientHeight / 2,
      0.1,
      3000
    );
    this.camera.position.set(1000, 1000, 1000);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    // Init Light
    const pointLight = new THREE.PointLight(0xffffff, 3, 0, 0);
    this.camera.add(pointLight);
    // Init renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    this.renderer.localClippingEnabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.autoClear = false;
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    // Init Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  render() {
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }
  initGUI() {
    const _this = this;
    this.gui
      .add(this.params, "resolution", 5, 10, 1)
      .name("分辨率")
      .onChange(() => {
        _this.needUpdate = true;
      });
  }
  addEventListener() {
    window.addEventListener("resize", () => {
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    });
  }
}
const app = new App();
function animate() {
  requestAnimationFrame(animate);
  app.render();
}
animate();
