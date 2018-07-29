function test(){
    return 'test';
}
async function testAsync(){
    return 'testAsync';
}
async function testAwait(){
    const v1=await test();
    const v2=await testAsync();
    console.log(v1,v2);
}
testAwait();