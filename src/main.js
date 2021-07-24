const div = dom.create("<div>newDiv</div>");
//console.log(div);

dom.after(test, div);

const div3 = dom.create("<div>parent</div>");
dom.wrap(test, div3);

const s = dom.empty(empty);
//console.log(s);

dom.attr(empty, "title", "chen");
const y = dom.attr(empty, "title");
//console.log(y);

dom.text(empty, "帅锅");
const t = dom.text(empty);
//console.log(t);

dom.html(html, "<span>新的标签</span>");
const h = dom.html(html);
//console.log(h);

//dom.style(test, { border: "1px solid red", color: "blue" });
//dom.style(test, "border", "1px solid black");
//console.log(dom.style(test, "border"));

dom.class.add(test, "red");
dom.class.remove(test, "red");
//console.log(dom.class.has(test, "red"));

const fn = () => {
  console.log("点击了");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn);

//console.log(dom.find("#img1")[0]);
const imgTest = dom.find("#img1")[0];
const imgTest2 = dom.find(".beauty", imgTest)[0];
//console.log(imgTest2);

//console.log(dom.parent(test));
//console.log(dom.children(img1)[0]);

//console.log(dom.siblings(s2));
//console.log(dom.next(s2));
//console.log(dom.previous(s2));

const c = dom.children(travel);
dom.each(c, (n) => {
  dom.style(n, "color", "red");
});

console.log(dom.index(s2));
