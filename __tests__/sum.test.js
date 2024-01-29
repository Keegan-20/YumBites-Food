import sum from "../src/components/sum";

test("Check sum of 2  positive number", () =>{
    expect(sum(2,3)).toBe(5);
});