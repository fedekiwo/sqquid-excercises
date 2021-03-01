const record1 = { field1: "test", field2: "||||test1", field3: "tttttttttttest", field4: "aaaabbbccc", field5: null };
const record2 = { field1: "February", field2: "Making TESTS", field3: "NoT CaSe SENsiTIVe", field4: "", field5: "123123" };
const record3 = { field1: "not really a good field", field2: "spec.js", field3: "asdasdasd", field4: ":)", field5: "super really epic TEST" };

const records = [record2, record3, record1]

const args1 = ["Hi", "Hola"], args2 = ["Goodbye", "Chau"], args3 = ["He", "El"], args4 = ["She", "Ella"];
const expected1 = "Hi-Hola", expected2 = "Goodbye-Chau", expected3 = "He-El", expected4 = "She-Ella";

module.exports = {
  fuzzySearch: {
    record1,
    record2,
    record3,
    records
  },
  cache: {
    args1,
    args2,
    args3,
    args4,
    expected1,
    expected2,
    expected3,
    expected4
  }
};
