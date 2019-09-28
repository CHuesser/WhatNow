export interface ReverseGeocodingResponse {
    plus_code: PlusCode;
    results: Result[];
    status: string;
}

export interface PlusCode {
    compound_code: string;
    global_code: string;
}

export interface Result {
    address_components: AddressComponent[];
    formatted_address: string;
    place_id: string;
    types: string[];
}

export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}
