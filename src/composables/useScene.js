import { ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const adapter = ref({})

export function useScene() {

    const onMounted = async (canvas) => {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xFFFFFF)

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.5
        renderer.outputEncoding = THREE.sRGBEncoding

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.autoRotate = true

        const directionalLight = new THREE.DirectionalLight(0xffffff, .3)
        directionalLight.position.set(0, 2, 0)
        directionalLight.castShadow = true
        directionalLight.shadow.camera.top = 20
        directionalLight.shadow.camera.bottom = -20
        directionalLight.shadow.camera.left = -20
        directionalLight.shadow.camera.right = 20
        directionalLight.shadow.camera.near = 0.1
        directionalLight.shadow.camera.far = 1000
        directionalLight.shadow.mapSize.width = 1024
        directionalLight.shadow.mapSize.height = 1024
        scene.add(directionalLight)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0xffffff, 4.5)
        pointLight.position.set(0, 1.5, 3)
        pointLight.castShadow = true
        scene.add(pointLight)

        const pointLight2 = new THREE.PointLight(0xffffff, 4.5)
        pointLight2.position.set(-1.15, 1, -0.2)
        pointLight2.castShadow = true
        scene.add(pointLight2)

        const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 32)
        const planeMaterial = new THREE.MeshPhysicalMaterial({ color: 0xCCCDDD, side: THREE.DoubleSide })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.position.y = -1
        plane.rotation.x = Math.PI / 2
        //scene.add(plane)

        const metallicGray = new THREE.MeshPhysicalMaterial({ color: 0xDDDDDD, metalness: 0.6, roughness: 0 })
        const smoothBlack = new THREE.MeshPhysicalMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.4 })
        const mattBlack = new THREE.MeshPhysicalMaterial({ color: 0x333333, metalness: 1, roughness: 1 })
        const mattWhite = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, metalness: 1, roughness: 1 })
        const mattBlue = new THREE.MeshPhysicalMaterial({ color: 0x2D41D4, metalness: 1, roughness: 1 })
        const smoothRed = new THREE.MeshPhysicalMaterial({ color: 0xFF0000, metalness: 0.3, roughness: 0.4 })
        const lightGreen = new THREE.MeshStandardMaterial({ color: 0x00FF00, emissive: 0x00FF00, emissiveIntensity: 0.5 })
        const lightWhite = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.5 })
        const lightFadeEmission = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.1 })
        lightFadeEmission.transparent = true
        lightFadeEmission.opacity = 0.05
        const lightFadeEmissionBlue = new THREE.MeshStandardMaterial({ color: 0x2D41D4, emissive: 0x2D41D4, emissiveIntensity: 0.1 })
        lightFadeEmissionBlue.transparent = true
        lightFadeEmissionBlue.opacity = 0.1

        const textureLoader = new THREE.TextureLoader()
        const blackFabricTexture = await textureLoader.loadAsync('/textures/black_fabric_basecolor.png')
        const blackFabricMaterial = new THREE.MeshPhysicalMaterial({ map: blackFabricTexture })

        async function loadModel(src, castShadow, receiveShadow, submeshes = []) {
            const loader = new GLTFLoader()
            const model = await loader.loadAsync(src)
            const mesh = model.scene;
            scene.add(mesh)
            mesh.position.y = -1
            mesh.rotation.y = Math.PI / 2
            mesh.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = castShadow
                    child.receiveShadow = receiveShadow
                }

                submeshes.forEach(submesh => {
                    if (submesh.pattern) {
                        const regex = new RegExp(submesh.pattern)
                        if (regex.test(child.name)) {
                            child.material = submesh.material
                        }
                    }
                    else if (child.name === submesh.name) {
                        child.material = submesh.material
                    }
                })
            })
        }
        loadModel('/table.glb', true, true, [
            { name: 'Table_Legs', material: metallicGray },
            { name: 'Table_Top', material: smoothBlack }
        ])
        loadModel('/keyboard.glb', true, true, [
            { name: 'Keyboard', material: metallicGray },
            { name: 'Light_1', material: lightGreen },
            { name: 'Light_2', material: lightGreen },
            { name: 'Light_3', material: lightGreen },
            { pattern: /Key_\d+_Top/, material: smoothRed },
            { pattern: /Key_\d+_Bottom/, material: smoothBlack },
        ])
        loadModel('/mouse.glb', true, true, [
            { name: 'Mouse_Back', material: smoothRed },
            { name: 'Mouse_Front', material: metallicGray },
            { name: 'Scroll', material: smoothBlack },
        ])
        loadModel('/mousepad.glb', [
            { name: 'Mousepad', material: mattBlack },
        ])
        loadModel('/monitor.glb', true, true, [
            { name: 'Monitor_Stand', material: metallicGray },
            { name: 'Monitor_Frame', material: metallicGray },
            { name: 'Monitor_Glass', material: smoothBlack },
        ])
        loadModel('/chair.glb', true, true, [
            { name: 'Chair_Metal', material: metallicGray },
            { name: 'Chair_Pillow', material: blackFabricMaterial },
            { name: 'Chair_Back', material: blackFabricMaterial },
            { pattern: /Chair_Wheel/, material: smoothBlack },
        ])
        loadModel('/lamp.glb', true, true, [
            { name: 'Lamp', material: blackFabricMaterial },
            { name: 'Lamp_Stand', material: metallicGray },
            { name: 'Lamp_Light_Top', material: lightWhite },
            { name: 'Lamp_Light_Bottom', material: metallicGray },
        ])
        loadModel('/lamp_emission.glb', false, false, [
            { name: 'Lamp_Light_Emission_1', material: lightFadeEmission },
        ])
        loadModel('/notebook.glb', true, true, [
            { name: 'Notebook', material: mattWhite },
            { name: 'Notebook_Lines', material: mattBlue },
            { name: 'Notebook_R_1', material: mattWhite },
            { name: 'Notebook_R_2', material: mattWhite },
            { name: 'Notebook_Top', material: mattBlue },
        ])
        loadModel('/pen.glb', true, true, [
            { name: 'Pen', material: mattBlack },
            { name: 'Pen_Handle', material: smoothBlack },
        ])
        loadModel('/coffee.glb', true, true, [
            { name: 'Cup', material: mattWhite },
            { name: 'Coffee', material: smoothBlack },
        ])
        loadModel('/sky.glb', false, true, [
            { name: 'Sky', material: lightWhite },
            { name: 'Sky_Floor', material: mattWhite },
        ])

        const screenMaterial = new THREE.MeshPhysicalMaterial({ color: 0x2D41D4, emissive: 0x2D41D4, emissiveIntensity: 1 })
        const screenStarBarMaterial = new THREE.MeshPhysicalMaterial({ color: 0xCCCDDD, emissive: 0xCCCDDD, emissiveIntensity: 1 })
        const screenBtnMaterial = new THREE.MeshPhysicalMaterial({ color: 0xAAAAAA, emissive: 0xAAAAAA, emissiveIntensity: 1 })
        const screenIconMaterial = new THREE.MeshPhysicalMaterial({ color: 0x000B97, emissive: 0x000B97, emissiveIntensity: 1 })
        const screenTextMaterial = new THREE.MeshPhysicalMaterial({ color: 0x000000, emissive: 0x000000, emissiveIntensity: 1 })
        const screenWindowBggMaterial = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 1 })
        loadModel('/os.glb', false, false, [
            { name: 'Monitor_Screen', material: screenMaterial },
            { name: 'Monitor_StartBar', material: screenStarBarMaterial },
            { name: 'Monitor_StartBar_BrowserButton', material: screenBtnMaterial },
            { name: 'Monitor_StartBar_StartButton', material: screenBtnMaterial },
            { name: 'Monitor_StartBar_BrowserButton_Icon', material: screenIconMaterial },
            { pattern: /Monitor_StartBar_StartButton_Icon/, material: screenIconMaterial },
            { name: 'Monitor_BrowserButton_Icon', material: screenIconMaterial },
            { name: 'Monitor_BrowserButton_Text', material: screenTextMaterial },
            { name: 'Monitor_WindowBar', material: screenStarBarMaterial },
            { name: 'Monitor_Window_Icon', material: screenIconMaterial },
            { name: 'Monitor_WindowAddressBar', material: screenWindowBggMaterial },
            { name: 'Monitor_WindowBgg', material: screenWindowBggMaterial },
            { name: 'Monitor_WindowBgg', material: screenWindowBggMaterial },
            { name: 'Monitor_WindowCloseButton', material: screenBtnMaterial },
            { name: 'Monitor_WindowMinimizeButton', material: screenBtnMaterial },
            { pattern: /Monitor_WindowCloseButton_Icon/, material: screenTextMaterial },
            { pattern: /Monitor_WindowMinimizeButton_Icon/, material: screenTextMaterial },
        ])

        camera.position.x = -2
        camera.position.z = 3
        camera.position.y = 1
        camera.lookAt(0, 2, 0)
        controls.target.set(0, 1, 0)

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        const animate = () => {
            requestAnimationFrame(animate)

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            controls.update()

            renderer.render(scene, camera)
        }

        animate()

        adapter.value = { scene, camera, renderer }
    }

    const onUnmounted = () => {
        adapter.value = {}
    }

    return {
        onMounted,
        onUnmounted
    }
}