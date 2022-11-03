export interface Articles2 {
    id?: number,
    name: string,
    image_link: string,
    description: string,
    price: number,
    created_at?: any,
    updated_at?: any,
    is_published?: any,
    user_id?: any,
}

export interface Articles2State {
    data: Articles2[],
    current_page: any,
    first_page_url: any,
    from: any,
    last_page: any,
    last_page_url: any,
    links: any,
    next_page_url: any,
    path: any,
    per_page: any,
    prev_page_url: any,
    to: any,
    total: any
}

