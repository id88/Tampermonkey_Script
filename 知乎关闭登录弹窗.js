// ==UserScript==
// @name         知乎关闭登录弹窗
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动关闭知乎网站的登录弹窗
// @author       You
// @match        https://www.zhihu.com/*
// @match        https://zhihu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 尝试关闭登录弹窗的函数
    function closeLoginModal() {
        // 查找关闭按钮
        const closeButton = document.querySelector('html body div div div div.Modal-wrapper.undefined.Modal-enter-done div.Modal.Modal--default.signFlowModal button.Button.Modal-closeButton.Button--plain');
        
        // 如果找到关闭按钮，则模拟点击
        if (closeButton) {
            closeButton.click();
            console.log('知乎登录弹窗已关闭');
        } else {
            // 可选：如果没找到按钮，可以检查弹窗是否存在
            const modal = document.querySelector('html body div div div div.Modal-wrapper.undefined.Modal-enter-done div.Modal.Modal--default.signFlowModal');
            if (modal) {
                console.log('找到登录弹窗，但未找到关闭按钮');
            }
        }
    }

    // 页面加载时立即尝试关闭
    closeLoginModal();

    // 设置定时器，定期检查是否有弹窗出现（因为弹窗可能是动态加载的）
    const intervalId = setInterval(closeLoginModal, 1000);

    // 10秒后清除定时器（可根据需要调整）
    setTimeout(() => {
        clearInterval(intervalId);
    }, 10000);

    // 监听DOM变化，当有变化时尝试关闭弹窗
    const observer = new MutationObserver(closeLoginModal);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

