// Promise only version of the asynchronous code.
// function ExpensiveWebCall(time : number) : Promise<void> {
//     return new Promise((resolve, reject) => setTimeout(resolve, time));
// }
// class MyWebService {
//     CallExpensiveWebOperation() : void {
//         ExpensiveWebCall(4000).then(()=> console.log(`Finished web service`))
//             .catch(()=> console.log(`Expensive web call failure`));
//     }
// }

function ExpensiveWebCall(time : number) : Promise<{}> {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}
class MyWebService {
    async CallExpensiveWebOperation() : Promise<void> {
        try {
            ExpensiveWebCall(4000);
            console.log(`Finished web service`)
        } catch (error) {
            console.log(`Caught ${error}`);
        } 
    }
}


console.log(`calling service`);
new MyWebService().CallExpensiveWebOperation();
console.log(`Processing continues until the web service returns`);