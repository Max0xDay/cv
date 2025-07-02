/* Author: Max Day
 * Date: 03/04/2025
 *
 */

const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    const color1 = new THREE.Color(0x6366f1); // Primary color
    const color2 = new THREE.Color(0x3b82f6); // Secondary color
    
    for (let i = 0; i < particlesCount * 3; i += 3) {

        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 10;

        const mixRatio = Math.random();
        const mixedColor = color1.clone().lerp(color2, mixRatio);
        
        colorsArray[i] = mixedColor.r;
        colorsArray[i + 1] = mixedColor.g;
        colorsArray[i + 2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        transparent: true,
        opacity: 0.8,
        vertexColors: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    const animate = () => {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.y += 0.002;
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += mouseX * 0.0005;
        particlesMesh.rotation.x += mouseY * 0.0005;
        
        renderer.render(scene, camera);
    };
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
};

document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    

    const revealCards = () => {
        const cards = document.querySelectorAll('.card');
        const windowHeight = window.innerHeight;
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < windowHeight - 100) {
                card.classList.add('visible');
            }
        });
    };
    

    const initProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width') + '%';
            

            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight;
            
            if (isVisible) {
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        revealCards();
        initProgressBars();

        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    

    document.getElementById('download-cv').addEventListener('click', () => {
        generatePDF();
    });
    
    function generatePDF() {
        
        const canvasContainer = document.getElementById('canvas-container');
        const originalCanvasDisplay = canvasContainer.style.display;
        canvasContainer.style.display = 'none';
        
        if (typeof html2pdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = function() {
                
                const options = {
                    margin: 10,
                    filename: 'Max_Day_CV.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                
                html2pdf().set(options).from(document.body).save().then(() => {
                    canvasContainer.style.display = originalCanvasDisplay;
                });
            };
            document.head.appendChild(script);
        } else {
            
            const options = {
                margin: 10,
                filename: 'Max_Day_CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            html2pdf().set(options).from(document.body).save().then(() => {
                canvasContainer.style.display = originalCanvasDisplay;
            });
        }
    }
    
    const serverUrl = window.location.origin; // i needed this for the downlaod links dont question it 


    const semester1Button = document.getElementById('semester-1');
    if (semester1Button) {
        semester1Button.addEventListener('click', () => {
            openPdfPreview(`${serverUrl}/pdfs/Semester_1.pdf`, 'Semester 1');
        });
    }
    

    const semester2Button = document.getElementById('semester-2');
    if (semester2Button) {
        semester2Button.addEventListener('click', () => {
            openPdfPreview(`${serverUrl}/pdfs/Semester_2.pdf`, 'Semester 2');
        });
    }
    
    const semester3Button = document.getElementById('semester-3');
    if (semester3Button) {
        semester3Button.addEventListener('click', () => {
            openPdfPreview(`${serverUrl}/pdfs/Semester_3.pdf`, 'Semester 3');
        });
    }
    
    const semester4Button = document.getElementById('semester-4');
    if (semester4Button) {
        semester4Button.addEventListener('click', () => {
            openPdfPreview(`${serverUrl}/pdfs/Semester_4.pdf`, 'Semester 4');
        });
    }
    
    const semester5Button = document.getElementById('semester-5');
    if (semester5Button) {
        semester5Button.addEventListener('click', () => {
            openPdfPreview(`${serverUrl}/pdfs/Semester_5.pdf`, 'Semester 5');
        });
    }
    
    const semester6Button = document.getElementById('semester-6');
    if (semester6Button) {
        semester6Button.addEventListener('click', () => {
            openPdfPreview(`${serverUrl}/pdfs/Semester_6.pdf`, 'Semester 6');
        });
    }

    document.getElementById('download-ieb-marks').addEventListener('click', () => {
        openPdfPreview(`${serverUrl}/pdfs/IEB_Marks.pdf`, 'IEB Marks');
    });
    
    

    revealCards();
    initProgressBars();
});

//idk how this function rly works excatly and if I change anything about it 
function openPdfPreview(pdfPath, title) {

    const isMobile = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);
    if (!isMobile) {

        const modal = document.createElement('div');
        modal.className = 'pdf-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.zIndex = '1000';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        
        const modalContainer = document.createElement('div');
        modalContainer.style.width = '70%'; // make it slighly smaller
        modalContainer.style.height = '80%';
        modalContainer.style.backgroundColor = '#1e293b'; // Updated for dark mode
        modalContainer.style.borderRadius = '10px';
        modalContainer.style.overflow = 'hidden';
        modalContainer.style.display = 'flex';
        modalContainer.style.flexDirection = 'column';
        modalContainer.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
        
        
        const header = document.createElement('div');
        header.style.padding = '15px';
        header.style.backgroundColor = '#6366f1'; // Updated for dark mode
        header.style.color = 'white';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        titleElement.style.margin = '0';
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.gap = '15px';
        
        const downloadButton = document.createElement('button');
        downloadButton.innerHTML = '<span>Download</span>';
        downloadButton.style.background = 'none';
        downloadButton.style.border = '1px solid white';
        downloadButton.style.color = 'white';
        downloadButton.style.padding = '5px 10px';
        downloadButton.style.borderRadius = '5px';
        downloadButton.style.cursor = 'pointer';
        downloadButton.style.fontSize = '14px';
        downloadButton.style.display = 'flex';
        downloadButton.style.alignItems = 'center';
        downloadButton.onclick = () => {
            window.open(pdfPath, '_blank');
        };
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.color = 'white';
        closeButton.style.fontSize = '28px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.lineHeight = '1';
        closeButton.onclick = () => document.body.removeChild(modal);
        
        buttonContainer.appendChild(downloadButton);
        buttonContainer.appendChild(closeButton);
        
        header.appendChild(titleElement);
        header.appendChild(buttonContainer);
        
        const iframe = document.createElement('iframe');
        iframe.src = pdfPath;
        iframe.style.width = '100%';
        iframe.style.height = 'calc(100% - 50px)';
        iframe.style.border = 'none';
        
   
        modalContainer.appendChild(header);
        modalContainer.appendChild(iframe);
        modal.appendChild(modalContainer);
        document.body.appendChild(modal);
    } else {
        // On mobile, just download the file
        window.open(pdfPath, '_blank');
    }
}