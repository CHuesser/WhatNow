export interface Activity {
    event_id: number;
    date: string;
    start_time: string;
    end_time?: any;
    title_en: string;
    short_description_en: string;
    long_description_en: string;
    homepage?: any;
    price_information: string;
    thumbnail_url: string;
    address_street: string;
    address_address_line?: any;
    address_zip: string;
    address_city: string;
    address_country: string;
    address_venue_name: string;
    address_latitude: number;
    address_longitude: number;
    category: string;
    duration: number;
    price: string;
}

export interface Category {
    category_id: number;
    title_de: string;
    title_en: string;
    title_fr: string;
    title_it: string;
    parent_category_id?: any;
}

export interface EventCategory {
    event_id: number;
    category_id: number;
}

export interface Guidle_Event {
    event_id: number;
    date: string;
    start_time: string;
    end_time?: any;
    title_de: string;
    title_en: string;
    title_fr: string;
    title_it: string;
    short_description_de: string;
    short_description_en: string;
    short_description_fr: string;
    short_description_it: string;
    long_description_de: string;
    long_description_en: string;
    long_description_fr: string;
    long_description_it: string;
    homepage?: any;
    price_information: string;
    thumbnail_url: string;
    address_street: string;
    address_address_line?: any;
    address_zip: string;
    address_city: string;
    address_country: string;
    address_venue_name: string;
    address_latitude: number;
    address_longitude: number;
}
