import React from 'react';
import './EldersignSvg.css';

const EldersignSvg =(props)=>{
    return(
<svg style={props.style} width={props.width} height={props.height} viewBox="0 0 95 97" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="eldersignsvg">

    <title>Eldersign</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <filter x="-20.5%" y="-17.9%" width="141.0%" height="140.5%" filterUnits="objectBoundingBox" id="filter-1">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feMerge>
                <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
        <path d="M39.606668,0.0286987388 C39.606668,0.0286987388 35.7449681,4.32290703 28.0215684,12.9113236 L13.4232036,12.9113236 L13.4232036,28.437664 L-7.10542736e-15,41.0286987 L13.4232036,55.4715203 L13.4232036,70.8258608 L28.0215684,70.8258608 L42.606668,83.7796696 L55.6476567,70.8258608 L73.106668,71.0286987 L71.606668,55.5286987 L82.606668,41.0286987 L68.106668,28.5286987 L68.106668,13.0286987 L56.3763965,12.9113236 L43.4895338,-7.10542736e-15 C40.9009566,0.0191324925 39.606668,0.0286987388 39.606668,0.0286987388 Z" id="path-1"  className="eldersign__path"></path>
        <filter x="-9.3%" y="-6.6%" width="118.6%" height="118.1%" filterUnits="objectBoundingBox" id="filter-3">
            <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
            <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
            <feMorphology radius="1" operator="erode" in="SourceAlpha" result="shadowInner"></feMorphology>
            <feOffset dx="0" dy="2" in="shadowInner" result="shadowInner"></feOffset>
            <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1"></feComposite>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <filter x="-8.1%" y="-5.4%" width="116.2%" height="115.7%" filterUnits="objectBoundingBox" id="filter-4">
            <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
            <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Eldersign" filter="url(#filter-1)" transform="translate(6.393332, 2.471301)">
            <g id="Path">
                <use fill="black" fillOpacity="1" filter="url(#filter-3)" xlinkHref="#path-2"></use>
                <use fill="black" fillOpacity="1" filter="url(#filter-4)" xlinkHref="#path-2"></use>
                <use stroke={"#979797"} strokeWidth="1" xlinkHref="#path-2"></use>
            </g>
            <path d="M34.106668,12.5286987 C35.1212802,12.5286987 38.4183089,17.3911173 42.606668,22.0286987 C46.6743873,26.5327012 51.6285863,30.796964 53.106668,32.0286987 C55.106668,33.6953654 54.4400013,33.6953654 51.106668,32.0286987 C46.8479146,28.9157065 43.6812479,26.7490399 41.606668,25.5286987 C39.5320881,24.3083576 37.0320881,23.1416909 34.106668,22.0286987 L31.106668,27.0286987 C31.5517008,22.8561464 31.8850342,20.0228131 32.106668,18.5286987 C32.6843911,14.6340572 33.260349,12.5286987 34.106668,12.5286987 Z" id="Path-2" stroke={props.stroke} className="eldersign__path" ></path>
            <path d="M46.106668,30.5286987 C46.106668,30.5286987 46.106668,30.1953654 46.106668,29.5286987 C43.3499389,29.6454842 41.1832723,29.6454842 39.606668,29.5286987 C38.0300637,29.4119132 35.6967304,29.0785799 32.606668,28.5286987 C28.3662974,27.6178242 25.1996307,26.7844908 23.106668,26.0286987 C21.0137053,25.2729066 18.1803719,23.9395733 14.606668,22.0286987 C15.9502356,26.4375243 17.2835689,29.604191 18.606668,31.5286987 C19.9297671,33.4532065 22.2631004,35.6198732 25.606668,38.0286987 L27.106668,38.0286987 C26.8064572,37.0783826 26.3064572,36.0783826 25.606668,35.0286987 C24.9068788,33.9790149 23.7402121,32.4790149 22.106668,30.5286987 C24.4794261,30.5286987 26.1460928,30.5286987 27.106668,30.5286987 C40.0647266,30.5286987 46.106668,30.5286987 46.106668,30.5286987 Z" id="Path-3" stroke={props.stroke} className="eldersign__path"></path>
            <path d="M29.106668,31.5286987 L31.106668,31.5286987 L30.606668,57.0286987 L39.106668,48.0286987 C39.6441407,48.7057138 39.977474,49.2057138 40.106668,49.5286987 C40.235862,49.8516837 40.235862,50.185017 40.106668,50.5286987 C37.5229844,53.6960659 35.6896511,56.3627326 34.606668,58.5286987 C33.5236849,60.6946649 32.3570183,64.0279982 31.106668,68.5286987 C30.1158921,69.5326775 29.4492254,66.8660109 29.106668,60.5286987 C28.7641106,54.1913866 28.7641106,44.5247199 29.106668,31.5286987 Z" id="Path-4" stroke={props.stroke} className="eldersign__path"></path>
            <path d="M34.606668,34.5286987 C34.2044843,36.2300291 34.2044843,37.3966958 34.606668,38.0286987 C34.9045026,38.4967246 35.1047373,39.5226534 36.606668,40.0286987 C36.957478,40.1468971 37.7908114,40.4802305 39.106668,41.0286987 L34.606668,41.0286987 L31.106668,39.0286987 L34.606668,34.5286987 Z" id="Path-5" stroke={props.stroke} className="eldersign__path"></path>
            <path d="M43.606668,40.0286987 C43.606668,36.3620321 43.106668,33.8620321 42.106668,32.5286987 L41.106668,32.5286987 L41.106668,36.5286987 L39.106668,36.5286987 L39.106668,39.0286987 C40.5006561,39.9580241 41.5006561,40.6246908 42.106668,41.0286987 C42.7126799,41.4327067 43.2126799,41.76604 43.606668,42.0286987 C43.606668,44.3620321 43.606668,43.6953654 43.606668,40.0286987 Z" id="Path-6" stroke={props.stroke} className="eldersign__path"></path>
            <path d="M45.106668,33.0286987 C46.6579353,33.7908478 47.4912686,34.5181205 47.606668,35.2105169 C47.7220674,35.9029133 47.2220674,37.1756406 46.106668,39.0286987 C48.1086282,37.8038086 49.4419615,36.8947177 50.106668,36.301426 C50.7713744,35.7081343 51.2713744,34.9808616 51.606668,34.1196078 L45.106668,33.0286987 Z" id="Path-7" stroke={props.stroke} className="eldersign__path"></path>
            <path d="M32.606668,41.5286987 C38.2347319,44.5821904 42.7347319,46.5821904 46.106668,47.5286987 C49.4786041,48.4752071 54.8119374,49.3085404 62.106668,50.0286987 L55.606668,38.0286987 C58.2867142,39.7863738 60.1200475,41.1197071 61.106668,42.0286987 C63.1987652,43.9561864 64.4701175,46.0988449 65.606668,47.5286987 C67.547204,49.9700183 69.3805374,53.3033516 71.106668,57.5286987 C65.4818839,56.987104 60.9818839,56.1537707 57.606668,55.0286987 C54.2314521,53.9036268 49.2314521,51.5702934 42.606668,48.0286987 L32.606668,43.5286987 L32.606668,42.0286987 L32.606668,41.5286987 Z" id="Path-8" stroke={props.stroke} className="eldersign__path"></path>
            <path d="M43.606668,45.5286987 C45.2733347,45.5286987 53.2733347,39.1953654 67.606668,26.5286987 L54.106668,28.0286987 L58.106668,30.0286987 C54.4556811,34.0684502 51.9556811,36.7351169 50.606668,38.0286987 C44.5540907,43.832574 42.3575957,45.5286987 43.606668,45.5286987 Z" id="Path-9" stroke={props.stroke} className="eldersign__path"></path>
        </g>
    </g>
</svg>
    )
}

export default EldersignSvg;