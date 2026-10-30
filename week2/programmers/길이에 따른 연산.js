function solution(num_list) {
    var answer = 0;

    if (num_list.length >= 11) {
        answer = num_list.reduce((a, b) => a + b, 0);
    } else {
        answer = num_list.reduce((a, b) => a * b, 1);
    }

    return answer;
}