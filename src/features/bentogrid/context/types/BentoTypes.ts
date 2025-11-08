export interface BentoGridBox {
    idx: number;
    position: [number, number, number];
    size: [number, number, number];
}

export interface BentoData {
    boxes: BentoGridBox[];
}
