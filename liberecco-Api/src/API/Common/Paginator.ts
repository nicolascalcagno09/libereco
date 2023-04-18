export function generateNewPaginatorResponse(selectPage:number, limit:number, totalResults:number) {

    let response = {
        selectPage: (Number(selectPage) > 0) ? Number(selectPage) : 1,
        firstPage:1,
        lastPage:Math.ceil(totalResults/limit),
        limit,
        totalResults
    }
  
    return response;
  }