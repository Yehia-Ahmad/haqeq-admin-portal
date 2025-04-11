export interface News {
    id: number;
    uuid: string;
    title: string;
    description: string;
    image: string | null;
    created_at: string;
    updated_at: string | null;
    image_path: string;
    pdf_path: string | null;
    created_by: string;
}