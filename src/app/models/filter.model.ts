import { Sorting } from './sorting.model';

export interface Filter {
  priority: string;
    title: string;
    status: string;
    reporter: string;
    page: number;
    sort: Sorting;
}
