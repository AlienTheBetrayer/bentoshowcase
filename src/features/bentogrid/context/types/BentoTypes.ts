export interface BentoGridBoxContent {
    title: string;
    description: string;
}

export interface BentoGridBox {
    idx: number;
    position: [number, number, number];
    size: [number, number, number];
    content: BentoGridBoxContent;
}

export interface BentoData {
    boxes: BentoGridBox[];
    selectedIdx: number | false;
}
