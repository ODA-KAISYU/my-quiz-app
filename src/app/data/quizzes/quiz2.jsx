const quiz2 ={
    id: "2",
    title: "第2章 小テスト",
    description:"",

    answers: Array.from({ length:26 }, (_, i) => ({ number: i + 1})) //解答欄を自動再生
};

export default quiz2;