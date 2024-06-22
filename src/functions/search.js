export default function search(array, text) {
    if(!array || !text) 
        throw new Error("Array or string not passed to search function.")
    const result = array.filter(object => {
        let include = false;
        for(const value of Object.values(object)) {
            if(typeof value == "string" && value.toLowerCase().includes(text.toLowerCase().trim())) {
                include = true;
                break;
            }
        }
        return include
    })
    result.sort((a,b) => new Date(b.time) - new Date(a.time))
    return result
}