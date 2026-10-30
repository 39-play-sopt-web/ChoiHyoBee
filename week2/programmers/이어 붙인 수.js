function solution(num_list) {
    var odd = num_list.filter(num => num % 2 !== 0);
    var even = num_list.filter(num => num % 2 === 0);

    var oddNum = Number(odd.join(""));
    var evenNum = Number(even.join(""));

    return oddNum + evenNum;
}