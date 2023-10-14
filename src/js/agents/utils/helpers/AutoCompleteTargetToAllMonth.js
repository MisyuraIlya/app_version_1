

export const AutoCompleteTargetToAllMonth = (array,agentId,Year) => {
    let data = array;
    let arr = [];
    for (let i = 1; i <= 12; i++) {
        //data.sales data.targets
        let found = data.targets.find(item => item.Month == i );
        let currentValue = null;
        let foundTtlVal = data.sales.find(item => item.Mmonth == i );
        if(foundTtlVal){
            currentValue = parseInt(foundTtlVal.Ttl);
        }

        if (found) {
            found.CurrentValue = currentValue;
            arr.push(found);
        } else {
            let object = {
                AgetId:agentId,
                Month:`${i}`,
                Year:Year,
                CurrentValue:currentValue,
                TargetValue:null,
                Completed:2,
                Value1:null,
                Value2:null,
                Value3:null,
                Unpublished:null,
                Extra:null,

            }
            arr.push(object);
        }
    }
    // return arr;

    return arr


      
}
