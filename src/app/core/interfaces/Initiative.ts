export interface Initiative {
    id: number;
    uuid: string;
    title: string;
    description: string;
    type: string;
    image: string | null;
    pdf: string | null;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string | null;
    image_path: string;
    pdf_path: string | null;
    status: string;
}