
const page  = `  
<h1>熵：宇宙的终极规则</h1>
<div class="page-mate">
    <div class="page-mate-message">
        <p>作者：<span>阮一峰</span></p>
        <p>日期：<span>2017年4月23日</span></p>
    </div>
    <span class="page-mate-share">分享</span>
</div>
<div class="page-sponsor"></div>
<div class="page-content">
    <h2>一、什么是内存泄漏？</h2>
    <h3>3.1 浏览器</h3>
    <p>有人曾经问<code>null</code>我："成年后，有没有书籍改变过你的世界观？"</p>
    <p>我想了想，还真有这样的书。那时，我已经工作好几年了，偶然在图书馆翻到一本旧书<a href="http://www.ruanyifeng.com/blog/2013/04/entropy.html" target="_blank">《熵：一种新的世界观》</a></p>
    <p><img src="http://www.ruanyifeng.com/blogimg/asset/2017/bg2017042401.jpg" alt="" title=""></p>
    <p><strong>他们就将那些在能量转换过程中浪费掉的、无法再利用的能量称为熵。</strong></p>
    <p><a href="https://nodejs.org/api/process.html#process_process_memoryusage" target="_blank"><code>process.memoryUsage</code></a></p>
    <blockquote>
            <pre class=" language-javascript"><code class=" language-javascript">const wm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    
const element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById<span class="token punctuation">(</span></span><span class="token string">'example'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    
wm<span class="token punctuation">.</span><span class="token function">set<span class="token punctuation">(</span></span>element<span class="token punctuation">,</span> <span class="token string">'some information'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
wm<span class="token punctuation">.</span><span class="token function">get<span class="token punctuation">(</span></span>element<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // "some information"
</span></code></pre>
    </blockquote>
    
    <ul>
            <li><a href="https://www.alexkras.com/simple-guide-to-finding-a-javascript-memory-leak-in-node-js/" target="_blank">Simple Guide to Finding a JavaScript Memory Leak in Node.js</a></li>
            <li><a href="https://www.dynatrace.com/blog/understanding-garbage-collection-and-hunting-memory-leaks-in-node-js/" target="_blank">Understanding Garbage Collection and hunting Memory Leaks in Node.js</a></li>
            <li><a href="https://www.toptal.com/nodejs/debugging-memory-leaks-node-js-applications" target="_blank">Debugging Memory Leaks in Node.js Applications</a></li>
            <li><a href="https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec" target="_blank">How JavaScript works: memory management</a></li>
    </ul>
    <blockquote><pre class=" language-bash"><code class=" language-bash">$ node <span class="token operator">--</span>expose<span class="token operator">-</span>gc</code></pre></blockquote>
</div>
`
module.exports = page