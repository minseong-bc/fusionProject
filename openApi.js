const BASE_URL = "http://apis.data.go.kr/B551011/KorService1";
const key = "Bgp26hbNKA1f+bfNu7YTthmnws002CO2H38vhYUqrqIUoCYI+sGqhRL0y/NiDMPoXZFXq/+9Cm0F3HHRXV9Ebw==";
const url = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1?pageNo=1&MobileOS=ETC&_type=JSON&listYN=Y&arrange=A&serviceKey=Bgp26hbNKA1f%2BbfNu7YTthmnws002CO2H38vhYUqrqIUoCYI%2BsGqhRL0y%2FNiDMPoXZFXq%2F%2B9Cm0F3HHRXV9Ebw%3D%3D&numOfRows=10&MobileApp=APP&contentTypeId=12&areaCode=1";

const titleArray = [];
// const resultArray = [];
async function fetchData() {
    const response = await fetch(url, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    // console.log(data);
    let res = '';
    for (let i = 0; i < data.response.body.items.item.length; i++) {
        res = data.response.body.items.item[i];
        if (res.firstimage !== '') {
            titleArray.push(res);
        }
        // titleArray.push(res);
        // console.log(titleArray[i].firstimage, titleArray[i].title);
    }
    return titleArray;
}

// fetchData();
fetchData().then(resultArray => {
    console.log(resultArray[0].title, resultArray[0].firstimage);
    console.log(resultArray[1].title, resultArray[1].firstimage);
    console.log(resultArray[2].title, resultArray[2].firstimage);
    console.log(resultArray[3].title, resultArray[3].firstimage);
    console.log(resultArray[4].title, resultArray[4].firstimage);
    // console.log(resultArray[5].title, resultArray[5].firstimage);
});