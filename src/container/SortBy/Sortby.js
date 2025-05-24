function sortedArray(array, key, dataType, sortDirection) {
    //sort in descending order'
    try{
        if(array.list !== undefined){
            array = array.list;
        }
    }catch{
        console.log("List is already destructured")
    }
``
    if(sortDirection === true){
        array.sort(function(a, b) {
            //Sort By number
            if(typeof a[key] === 'number'){
                return b[key] - a[key];
            }

            //Sort by String
            if(typeof a[key] === 'string'){
                if(dataType === "name"){
                    if (!a[key] && !b[key]) {return 0;}
                    if (!b[key]) {return 1;}
                    if (!a[key]) {return -1;}

                    if(a[key] > b[key]){
                        return -1;
                    }
                    if(a[key] < b[key]){
                        return 1;
                    }
                    return 0;
                }   

                //By Date
                if(dataType === "date"){
                    return new Date(b[key]) - new Date(a[key]);
                }
            }
        });

        return array; 
    }
    else{
        //sort in acscending order
        array.sort(function(a, b) {
            //Sort By number
            if(typeof a[key] === 'number'){
                return a[key] - b[key];
            }
            //Sort By String
            if(typeof a[key] === 'string'){
                //By Name
                if(dataType === "name"){
                    if (!a[key] && !b[key]) { return 0;}
                    if (!a[key]) {  return 1;}
                    if (!b[key]) { return -1;}

                    if(a[key] < b[key]){
                        return -1;
                    }
                    if(a[key] > b[key]){
                        return 1;
                    }
                    return 0;
                }

                //By Date
                if(dataType === "date"){
                    return new Date(a[key]) - new Date(b[key]);
                }
            }
        });

        //return sorted array 
        return array; 
    }
}

export default sortedArray;