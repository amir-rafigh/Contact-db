export default function generateFilter({gen , search } , User_Id){
    const Filter = {User_Id};
    if(gen=="male" || gen=="female"){
        Filter.Gender=gen
    }
    if(search){
        Filter.$or=[{FirstName:search},{LastName:search}]
    }
    return Filter

}