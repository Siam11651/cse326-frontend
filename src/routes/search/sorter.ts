import type { SearchResult } from "./search-result";

export enum SorterType
{
    NAME_ASC = 0, NAME_DESC = 1, PRICE_ASC = 2, PRICE_DESC = 3
}

export class SorterImplementation
{
    private static sorterName = 
    {
        0: "Name (Asc)",
        1: "Name (Desc)",
        2: "Price (Asc)",
        3: "Price (Desc)"
    };

    private static SorterFunctions =
    {
        0: (searchResults: SearchResult[]): SearchResult[] =>
        {
            searchResults.sort((left: SearchResult, right: SearchResult) =>
            {
                if(left.title < right.title)
                {
                    return -1;
                }
                else if(left.title === right.title)
                {
                    return 0;
                }
                else
                {
                    return 1;
                }
            });

            return searchResults;
        },
        1: (searchResults: SearchResult[]): SearchResult[] =>
        {
            searchResults.sort((left: SearchResult, right: SearchResult) =>
            {
                if(left.title < right.title)
                {
                    return 1;
                }
                else if(left.title === right.title)
                {
                    return 0;
                }
                else
                {
                    return -1;
                }
            });

            return searchResults;
        },
        2: (searchResults: SearchResult[]): SearchResult[] =>
        {
            searchResults.sort((left: SearchResult, right: SearchResult) =>
            {
                if(left.price < right.price)
                {
                    return -1;
                }
                else if(left.price === right.price)
                {
                    return 0;
                }
                else
                {
                    return 1;
                }
            });

            return searchResults;
        },
        3: (searchResults: SearchResult[]): SearchResult[] =>
        {
            searchResults.sort((left: SearchResult, right: SearchResult) =>
            {
                if(left.price < right.price)
                {
                    return 1;
                }
                else if(left.price === right.price)
                {
                    return 0;
                }
                else
                {
                    return -1;
                }
            });

            return searchResults;
        }, 
    }

    public static GetSorterName(sorterType: SorterType): string
    {
        return SorterImplementation.sorterName[sorterType];
    }

    public static ApplyFilter(searchResults: SearchResult[], sorterType: SorterType): SearchResult[]
    {
        return SorterImplementation.SorterFunctions[sorterType](searchResults);
    }
}

export class Sorter
{
    public name: string = "";
    public handler: ()=> void = (): void =>
    {
        
    }
}