window.addEventListener('load', function () {
    var focus = this.document.querySelector('.focus');
    var arrow_l = focus.querySelector('.arrow-l');
    var arrow_r = focus.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth;
    // 左右箭头的显示与隐藏
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        // 不占用资源
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    });
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // 圆圈
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 这里只能用get来获取属性 因为这是自定义属性
            // 如果不是this是li 则不会动态变化 只能执行一次
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            var step1 = -index * focusWidth;
            animate(ul, step1);
        });
        ol.children[0].className = 'current';
    }
    // 先克隆一个图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    // 右侧按钮
    // 防止图片连续点击造成播放过快 我们加上节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if(flag) {
            flag = false;
            if (num == ol.children.length) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            reset();
        }
    })
    arrow_l.addEventListener('click', function () {
        if(flag) {
            flag = false;
            if (num == 0) {
                num = ol.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            reset();
        }
    })
    function reset(){
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 放在if下面 不然加完无法立即判断
        ol.children[circle].className = 'current';
    }
    // 自动播放定时器
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);
})