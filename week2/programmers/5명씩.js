function solution(names) {
    var answer = names.filter((name, index) => index % 5 === 0);

    return answer;
}