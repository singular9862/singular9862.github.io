import{_ as n,X as s,Y as a,a0 as e}from"./framework-1e27cadd.js";const p={},t=e(`<h4 id="pdf转txt" tabindex="-1"><a class="header-anchor" href="#pdf转txt" aria-hidden="true">#</a> pdf转txt</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> PyPDF2


<span class="token keyword">def</span> <span class="token function">coverPDFToTxt</span><span class="token punctuation">(</span>pdf_file_path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> word_file_path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 打开pdf文件</span>
    pdf_file <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>pdf_file_path<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span>

    <span class="token comment"># 创建PDF对象</span>
    pdf_reader <span class="token operator">=</span> PyPDF2<span class="token punctuation">.</span>PdfReader<span class="token punctuation">(</span>pdf_file<span class="token punctuation">)</span>

    <span class="token comment"># 获得PDF中页面数</span>
    pages <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>pdf_reader<span class="token punctuation">.</span>pages<span class="token punctuation">)</span>

    <span class="token comment"># 创建一个空字符串来保存TXT文本</span>
    text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>

    <span class="token comment"># 循环遍历每一页，将文本添加到text字符串中</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>pages<span class="token punctuation">)</span><span class="token punctuation">:</span>
        page <span class="token operator">=</span> pdf_reader<span class="token punctuation">.</span>pages<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        text <span class="token operator">+=</span> page<span class="token punctuation">.</span>extract_text<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 关闭PDF文件</span>
    pdf_file<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 将文本写入TXT文件</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>word_file_path<span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
        <span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span>text<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    coverPDFToTxt<span class="token punctuation">(</span><span class="token string">&#39;d.pdf&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;d.txt&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="docx转txt" tabindex="-1"><a class="header-anchor" href="#docx转txt" aria-hidden="true">#</a> docx转txt</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pypandoc


<span class="token keyword">def</span> <span class="token function">docxToTxt</span><span class="token punctuation">(</span>docx_file_path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> txt_file_path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># Example file:</span>
    output <span class="token operator">=</span> pypandoc<span class="token punctuation">.</span>convert_file<span class="token punctuation">(</span>docx_file_path<span class="token punctuation">,</span> <span class="token string">&#39;plain&#39;</span><span class="token punctuation">,</span> outputfile<span class="token operator">=</span>txt_file_path<span class="token punctuation">)</span>
    <span class="token keyword">assert</span> output <span class="token operator">==</span> <span class="token string">&quot;&quot;</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    docxToTxt<span class="token punctuation">(</span><span class="token string">&#39;d.docx&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;d.txt&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="pdf转docx" tabindex="-1"><a class="header-anchor" href="#pdf转docx" aria-hidden="true">#</a> pdf转docx</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># Importing the Converter class from the pdf2docx module.</span>
<span class="token keyword">from</span> pdf2docx <span class="token keyword">import</span> Converter


<span class="token keyword">def</span> <span class="token function">pdfToWord</span><span class="token punctuation">(</span>pdf_file_path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> word_file_path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    converter_ <span class="token operator">=</span> Converter<span class="token punctuation">(</span>pdf_file_path<span class="token punctuation">)</span>
    converter_<span class="token punctuation">.</span>convert<span class="token punctuation">(</span>word_file_path<span class="token punctuation">,</span> start<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span>
    converter_<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    pdfToWord<span class="token punctuation">(</span><span class="token string">&#39;d.pdf&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;d.docx&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[t];function c(i,l){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","常用python脚本（文档处理）.html.vue"]]);export{u as default};
