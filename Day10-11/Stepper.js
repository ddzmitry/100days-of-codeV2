function staircase(n) {
    // Write your code here
    let t = n;
    let arr = [];
    for (let i = n; i > 0; i--) {
      let stepper = [];
      while (t > 0) {
        stepper.push(" ");
        t--;
      }
      t = n;
      // console.log(i)
    //   Works as well
      //   let int = Array(6).fill().map((v,i)=>" ").fill("#", i - 1, n);
      let int = stepper.fill("#", i - 1, n);
      arr.push(int.join(""));
      // fill with 0 from position 2 until position 4
      // console.log(array1.fill(0, 2, 4));
    }
    console.log(arr.join("\n"));
    // return arr.join('\n')
  }
  
  console.log(staircase(10));
  

// MIN Max Sum

