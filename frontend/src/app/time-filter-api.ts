export interface TimeFilterAPIRequest {
    locations: Location[];
    departure_searches: DepartureSearch[];
}

export interface DepartureSearch {
    id: string;
    departure_location_id: string;
    arrival_location_ids: string[];
    departure_time: Date;
    travel_time: number;
    properties: string[];
    transportation: Transportation;
}

export interface Transportation {
    type: string;
}

export interface Location {
    id: string;
    coords: Coords;
    properties?: Property[];
}

export interface Coords {
    lat: number;
    lng: number;
}

export interface TimeFilterAPIResponse {
    results: Result[];
}

export interface Result {
    search_id: string;
    locations: Location[];
    unreachable: string[];
}

export interface Property {
    travel_time: number;
}
