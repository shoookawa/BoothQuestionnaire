<script setup>
const userName = 'Hogege'
console.log(userName)
</script>

<template>
  <div class="border">
    <div class="img-frame">
      <img src="@/assets/img1.jpg" class="img" alt="Description" />
    </div>

    <div class="cyuuizikou">
      <h3>基本情報</h3>
    </div>

    <div class="frame">
      注意事項：<br />
      所要時間:5分 <br />回答可能回数<span id="c1">1回</span>のみ

      <br />
      <p>
        <span> 出店番号</span><br />
        <input id="dantai_num" type="nunber" size="20" />
      </p>
      <p>
        <span>団体識別番号</span><br />
        <input id="sikibetu_num" type="number" size="20" />
      </p>
      <p>
        <span>
          出店形態<br />
          <select>
            <option value="">出店形態</option>
            <option value="m">模擬店</option>
            <option value="o">屋外</option>
            <option value="k">教室物販</option>
            <option value="k2">教室飲食</option>
          </select>
        </span>
      </p>
      <p>
        満足度<br />
        (1:非常に不満 2:不満 3:普通 4:満足 5:非常に満足)<br />
        <label>1<input type="radio" name="manzoku" velu="1" /></label>
        <label> 2<input type="radio" name="manzoku" velu="2" /></label>
        <label> 3<input type="radio" name="manzoku" velu="3" /></label>
        <label> 4<input type="radio" name="manzoku" velu="4" /></label>
        <label> 5<input type="radio" name="manzoku" velu="5" /></label>
      </p>
      <p>
        実行委員会の対応の良さ<br />
        (1:非常に悪い 2:悪い 3:普通 4:良い 5:非常に良い)<br />
        <label>1<input type="radio" name="taiou" velu="1" /></label>
        <label> 2<input type="radio" name="taiou" velu="2" /></label>
        <label> 3<input type="radio" name="taiou" velu="3" /></label>
        <label> 4<input type="radio" name="taiou" velu="4" /></label>
        <label> 5<input type="radio" name="taiou" velu="5" /></label>
      </p>
      <p>
        クローバー祭の出店募集をどこで知ったか<br />
        <label>HP<input type="radio" name="bosyuu" velu="1" /></label>
        <label> ポスター<input type="radio" name="bosyuu" velu="2" /></label>
        <label> SNS<input type="radio" name="bosyuu" velu="3" /></label>
        <br />その他 <br /><input type="text" />
      </p>
      <br />

      ゴミの分別方法について不満があれば記入お願いします<br />
      <p>
        <textarea rows="5" cols="60" name="gomi">
      </p>

      <p>
        <span> 出店番号</span><br />
        <input type="number" name="num" />
      </p>
      <p>
        <span> 出店内容</span><br />
        <textarea rows="10" cols="43" name="content" size="40"></textarea
        >
      </p>
      <p>
        <span> ご意見・感想</span><br />
        <textarea id="sample" name="name" rows="15" cols="57"></textarea>
      </p>
      <button type="submit" min="20" max="100">送信</button>
    </div>
  </div>
</template>

<style scoped>
.img-frame {
  position: relative;
  max-width: 100%;
  height: 15%;
  overflow: hidden;
  margin: 0px auto;
}

.img {
  text-align: center;
  max-width: 100%;
  max-height: 100%;
}

.border {
  border: 5px double;
  max-width: 600px;
  height: 100%;
  border-color: rgb(195, 195, 195);
  margin: 10px auto;
}

.border span {
  position: relative;
}

.frame {
  border: 5px double;
  max-width: 400px;
  height: 100%;
  border-color: aqua;
  margin: auto;
}

h3 {
  text-align: center;
}

.frame button[type='submit'] {
  position: relative;
  left: 45%;
}

#c1 {
  color: red;
}

.cyuuizikou {
  text-align: center;
}
</style>
