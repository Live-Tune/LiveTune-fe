import styled from "styled-components";
import { useEffect, useRef } from "react";

function Wave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    /**@type {HTMLCanvasElement} */
    let cvs = canvasRef.current;
    /**@type {CanvasRenderingContext2D} */
    let ctx = cvs.getContext("2d");

    const resizeCanvas = () => {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight / 10;
      ctx.clearRect(0, 0, cvs.width, cvs.height);
    };

    let t = 1;
    const animateWave = () => {
      let w = cvs.width;
      let h = cvs.height;
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      for (let i = 0; i < cvs.width; i++) {
        let x = i;

        // version 1
        //let y = h / 2 + Math.sin(i / 20 + t) * (h / 2);

        // version 2
        // let y = h / 2 + (Math.sin(i / 20) * (h / 2)) / 2;
        // y += (Math.sin(i * 100000 + t) * h) / 4;

        // version 3
        // let y = h / 2 + (Math.sin(i / 20) * (h / 2)) / 2;
        // y += (Math.sin(i * 100000 + t) * h) / 16;

        // version 4
        // let y = h / 2 + (Math.sin(i / 20) * (h / 2)) / 2;
        // y += (Math.sin((i * t) / 512 + t) * h) / 4;

        // version 5
        // let y = h / 2 + (Math.sin(i / 20) * (h / 2)) / 2;
        // y += (Math.sin((i * t) / 512 + t) * h) / 8;
        // y += (Math.cos((i * t * t) / 256 + t) * h) / 16;

        let y = h / 2 + (Math.sin(i / 20) * (h / 2)) / 2;
        y += (Math.sin((i * t) / 512 + t) * h) / 4;
        ctx.lineTo(x, y);
      }
      if (t >= Math.PI * 512) {
        t -= 512 * Math.PI;
      } else {
        t += Math.PI / 128;
      }
      ctx.strokeStyle = `white`;
      ctx.lineWidth = 1;
      ctx.stroke();
      requestAnimationFrame(animateWave);
    };

    window.onresize = resizeCanvas;
    resizeCanvas();
    requestAnimationFrame(animateWave);
  }, []);

  return <WaveCanvas ref={canvasRef} />;
}

const WaveCanvas = styled.canvas`
  position: absolute;
  bottom: 0;
`;

export default Wave;
