import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o,c as p,a,b as s,e,d as l}from"./app-ca1a10f0.js";const r="/assets/b7767a49ab004e129badb410628436c0-c1769f7e.png",i="/assets/3acc4b4913b7436ab724eb6b1fcb3d71-5a352e18.png",d="/assets/c58996e12c294d3dbbe01a2e711aadb3-7ef5b875.png",b="/assets/5f4aa547a0174738823f8f4ddf127e66-71d89d07.png",u="/assets/f904b466c9e4493b9aa222fe6b30e489-026869c5.png",g="/assets/8df23dc190ff4e359d332eb3ae4bd7a0-ab8edfd5.png",f="/assets/744c3014798140d39805af004938022c-c62a3769.png",k="/assets/dc27f13caf4642dbaf464e0f1620a02e-0475fbfd.png",_="/assets/739381a7bef34ff7b0007d80cd87e73b-e0bfa918.png",m="/assets/2b52880855804f9bb84f61d0b9204440-581a0619.png",h="/assets/05c1e33652694269a40247a9f5f3a13b-1a14f706.png",v="/assets/bea4a2dca939427886147fb5067a3ab2-6b65e6f6.png",y="/assets/774adb20d32b409bb3f6e2adff3ddfc5-c9ae5fba.png",M="/assets/04fb2dbb06c542a3a836d59cd50d2a81-2315c96e.png",z="/assets/bb57e8f9b46b47bc917cecd4eb765a5b-9fc6b00d.png",R="/assets/c63d386022ca42948a6e1226466d186a-a31a1452.png",E="/assets/efc124da4e8046a394c13d15ab847581-33838ed9.png",S="/assets/e072c86fdd7449dfbc60ee879c689860-38920bf5.png",Q="/assets/a66b18af98054d8eb1072ea21eab8cca-542b7010.png",V="/assets/d4e9bfc98d45403795d8662ae521d189-d405550b.png",x="/assets/cb6e8bdc1f53453e8b2c7d4cb197a04d-050fe3e2.png",q="/assets/3e44374d466645e19a5a6aaf72247ff3-8285ff49.png",N="/assets/28716022e43248a1938e89ea7de181e4-ebe3c792.png",L="/assets/a4c4d9b29add4f179456c0904a500d71-50b22281.png",C="/assets/3e92ab12902f45eeba19199c02313775-fe654399.png",I="/assets/1bb982802b9d4c1eb44b084035fae292-14f3b36e.png",A="/assets/d39f5f63f243488f8ad24d016410aa35-6e897be6.png",B="/assets/4afe3912d9784a41874fd488566ebd52-770074a5.png",w="/assets/52bd51cd0d6b4bdd92bff5332d7e8f40-44a07530.png",O={},P=a("hr",null,null,-1),j=a("h2",{id:"rocketmq消息中间件",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#rocketmq消息中间件","aria-hidden":"true"},"#"),s(" RocketMQ消息中间件")],-1),K=a("p",null,"   RocketMQ是消息中间件之一，要谈什么是RocketMQ，就需要先明确什么是消息中间件，消息中间件的存在是为了解决什么样的问题？",-1),T=a("p",null,"   同样无需照本宣科，消息中间件就是在同一程序或不同程序间进行同步或者异步消息传递的第三方组建。那么消息中间件解决了什么样的问题，亦或者应用场景是什么？最出名的就是处理高并发场景下的流量削峰平谷。",-1),U=a("p",null,"   举一个比较浅显的例子，大批量订单打入系统，系统是需要对应生成物流信息的，但是如果这两件事放到一起做，就会在同一时间内占用很多资源去做物流信息生成这件事，但这件事本身对于订单来说是无关紧要的。因此就可以通过消息中间件，订单成功生成后，向消息中间件发送消息，告知订单生成成功，需生成物流信息，这样，生成订单的线程就可以直接结束掉。至于物流信息，则是根据相应的监听策略，监听到消息再写入，延时消费，批量消费，都可以起到资源合理分配的作用。",-1),D=a("p",null,"   此外，消息中间件还支持跨平台的数据信息传递，数据的分发和异步处理，分布式事务等。",-1),G={href:"https://rocketmq.apache.org/docs/4.x/",target:"_blank",rel:"noopener noreferrer"},H=a("hr",null,null,-1),F=a("h3",{id:"rocketmq基本消息发送接收",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#rocketmq基本消息发送接收","aria-hidden":"true"},"#"),s(" RocketMQ基本消息发送接收")],-1),Y={href:"https://rocketmq.apache.org/zh/docs/4.x/",target:"_blank",rel:"noopener noreferrer"},J={href:"https://gitee.com/apache/rocketmq/tree/develop/docs/cn",target:"_blank",rel:"noopener noreferrer"},W=l('<p>   这里继续介绍的是笔者基于上述基础使用文档以及公司实际业务场景所搭建的一个简易的消息收发框架。先介绍业务场景，现有项目是一个共享HR类项目，涉及多系统协同及多目录报表文档，现就有一实际需求，当三方平台向共享中心发单时，该单除了正常在共享中心生成一张工单随流程引擎正常派单外，还需写入对应台账报表中。例如，工单A是一张当月工资核算的工单，则需要写入工资核算台账，工单B是一张员工删减工单，则需要写入员工删减台账，当然这只是简化说法，实际上这里真对各个字段都有较为复杂的取值逻辑。</p><p>   在上述业务场景下，当时的解决方案是工单创建时就写入相应台账，放到一次调用一个线程中去做这件事，在前期业务量小且各台账取值逻辑不复杂的情况下，并未出现较大问题，但随着功能上线及后续逻辑完善，三方平台工单创建接口访问压力及响应压力就大了很多。因此笔者在此处提出一个优化假象，工单发起与生成台账之间的关系，和上文所述生成订单与生成物流信息，本身不存在强关联性，可以将之拆分为两件事来做。</p><p>   工单成功发起之后，发送消息通知之后需要干什么，消费者监听到消息，分配到对应的实现类消费消息，也就是写入对应台账，且消息异步发送，这样一来，两部分代码解藕，各做各事，提高三方平台工单发起接口的响应效率。</p><p>   由此笔者抽取出一个简单的消息发送与接收的模型，从使用层面来讲，只需要构建消息实体，配置发送模式与选定生产者，给定消息tag，发送消息即可；消费者在程序启动时，选定监听规则，启动监听组，监听既定的tag标签，拿到生产者发送的消息并消费。<br><img src="'+r+'" alt="b7767a49ab004e129badb410628436c0.png" loading="lazy"><br> 从程序实现来讲，需要做如下考量<br><img src="'+i+'" alt="33e95b5e0fbef6e6621b66dd7cc3d627.png" loading="lazy"></p><p>   值得一提的是，我司已构建RocketMQ和Kafka的使用框架，创建全局唯一的生产者组也是由此得来的灵感与经验，但个人学习不能因为有就可以不用学了，因此手搓一个发送与接收的建议框架，且与之不同的是提供多规则发送与接收消息的实现类入口，并在应用的全生命周期中对外暴露生产者的关闭方法（可开启并使用临时生产者，虽然可能没啥用）。</p><h3 id="简易收发框架代码" tabindex="-1"><a class="header-anchor" href="#简易收发框架代码" aria-hidden="true">#</a> 简易收发框架代码</h3><p>   整个建议框架结构如图所示，包括常量枚举，消费者，生产者，工具类，以及消息实体。<br><img src="'+d+'" alt="0f2bce4712025f52a9b23aebe68b747a.png" loading="lazy"><br> 动作枚举：消息接收到后究竟需要做什么事情，以及做事情的枚举类<br><img src="'+b+'" alt="837d96d0fa64006c516e4dce4e2567c6.png" loading="lazy"><br> 消费者消费行为枚举：各消费行为及实现类。<br><img src="'+u+'" alt="522c1753a19732f05980f07ace83583d.png" loading="lazy"><br> 生产者枚举：各消息发送方<br><img src="'+g+'" alt="234abf5e2773e791dc9f93d0b6158fa4.png" loading="lazy"><br> 生产者生产行为枚举：各生产行为及实现类<br><img src="'+f+'" alt="944b8e61a5098fe147bf1ce1f57b8b31.png" loading="lazy"></p><hr><p>消费动作实现类：消费方接收到消息后的具体行为实现类<br><img src="'+k+'" alt="0962f5cc295a74a44c0ef4d05b350771.png" loading="lazy"><br> 消费动作实现类：消费方接收到消息后的具体行为抽象类<br><img src="'+_+'" alt="90ada170f3ca471c75fcef8fb44861b0.png" loading="lazy"><br> 消费者消费行为抽象类：<br><img src="'+m+'" alt="1316c30019b9310daeb1a0f27cd66234.png" loading="lazy"><br> 推送且广播消费模式：<br><img src="'+h+'" alt="f4bc8b8f2c1f12456881ab309f8032f8.png" loading="lazy"><br> 消费者管理：系统启动时创建消费监听，建议根据不同tag并行消费<br><img src="'+v+'" alt="425ba9e7c95f8df609d97a7b1b38b7c5.png" loading="lazy"></p><hr><p>生产者消息发送行为抽象类：<br><img src="'+y+'" alt="d7fe2bb726812e9f2f584a5bc7d19bb6.png" loading="lazy"><br> 异步发送：<br><img src="'+M+'" alt="c819467a62187620641f58a7818ad508.png" loading="lazy"><br> 单向发送：<br><img src="'+z+'" alt="ce9fb8b286200ee6c5c44ca085f41bae.png" loading="lazy"><br> 同步发送：<br><img src="'+R+'" alt="4658075b40f8f182442df4ebddc96741.png" loading="lazy"><br> 生产者抽象类：<br><img src="'+E+'" alt="ed6ba53fd26bfc29fd54a035f7880278.png" loading="lazy"><br> 生产者实现类：<br><img src="'+S+'" alt="f1cd1a65f14c9afd059fd04671fd22ea.png" loading="lazy"><br> 生产者管理：根据传入key判定全局有无待机生产者，若有则直接使用，若无则新建一个。这部分源码及思路参考了我司rocketmq-manager包。<br><img src="'+Q+'" alt="97ae4a8a1e73b04234c32592f67392f3.png" loading="lazy"></p><hr><p>配置文件工具类：<br><img src="'+V+'" alt="c89a9b61312cdaa2452700a895edbddf.png" loading="lazy"></p><hr><p>全局基础消息：所有消息都是基于该消息类创建，固定全局唯一topic<br><img src="'+x+'" alt="a6d68e19d29e3137a6884de7169c3d90.png" loading="lazy"><br> 业务消息实体：传入需传入消息内容即可，serviceKind即为相应所需动作。<br><img src="'+q+'" alt="eb63209dbde7080538a97c4f1bdb1d00.png" loading="lazy"><br> 无关紧要的配置文件vo：<br><img src="'+N+`" alt="7542649637c37b0c003bd2f361a98979.png" loading="lazy"></p><hr><h3 id="测试使用" tabindex="-1"><a class="header-anchor" href="#测试使用" aria-hidden="true">#</a> 测试使用</h3><p>   在系统启动时就启动消费者监听，此处启动推送及广播消费者监听：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ConsumerManager</span><span class="token punctuation">.</span><span class="token function">createConsumer</span><span class="token punctuation">(</span><span class="token class-name">ConsumerEnum</span><span class="token punctuation">.</span><span class="token constant">CONSUMPTION_MESSAGE</span><span class="token punctuation">.</span><span class="token function">getListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>   会自动根据生产者枚举，创建相应的监听，形成监听组：<br><img src="`+L+'" alt="d134699ca182226240942e5b3ed9aaba.png" loading="lazy"><br><img src="'+C+`" alt="4c131a68d7d86583228fbffe41744473.png" loading="lazy"><br>    发送消息，这里三个枚举类配置的分别是,接收到消息后的具体行为，发送消息的生产者（对应消费者监听的tag），消息发送模式，为异步发送</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>            <span class="token class-name">LedgerMessageVo</span> ledgerMessageVo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LedgerMessageVo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ledgerMessageVo<span class="token punctuation">.</span><span class="token function">setServiceKind</span><span class="token punctuation">(</span><span class="token class-name">BaseServicesEnum</span><span class="token punctuation">.</span><span class="token constant">LEDGER_EVALUATION_BILL_FORM</span><span class="token punctuation">.</span><span class="token function">getServicesKind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ledgerMessageVo<span class="token punctuation">.</span><span class="token function">setPackageName</span><span class="token punctuation">(</span><span class="token string">&quot;aca&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Message</span><span class="token punctuation">&gt;</span></span> messageVos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            messageVos<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BaseMessageVo</span><span class="token punctuation">(</span><span class="token class-name">ProduceEnum</span><span class="token punctuation">.</span><span class="token constant">SERVICE_REQUEST_PRODUCE</span><span class="token punctuation">.</span><span class="token function">getProduceCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ledgerMessageVo<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">baseMessageVo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ProduceService</span> produceService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProduceServiceImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            produceService<span class="token punctuation">.</span><span class="token function">sent</span><span class="token punctuation">(</span>messageVos<span class="token punctuation">,</span><span class="token string">&quot;BASE_SERVICE&quot;</span><span class="token punctuation">,</span> <span class="token class-name">ProducerEnum</span><span class="token punctuation">.</span><span class="token constant">ASYNCHRONOUS_TRANSMISSION</span><span class="token punctuation">.</span><span class="token function">getMessageBehavior</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>messageVos<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在mq控制台查看已经发送成功<br><img src="`+I+'" alt="0438c0d95ff7bd4e074bbe51e194cb6c.png" loading="lazy"><br> 消息已成功消费<br><img src="'+A+'" alt="092369e7487bb555d5457856fb727b5c.png" loading="lazy"></p><hr><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3>',24),X=a("li",null,"这就是笔者在工作之余手搓的一个简易工具小框架，供自己简单了解学习使用，如源码所见，还有很多生产者及消费者的实现类已无暇补齐，权作练手，诸多之不足，烦请诸君指出亦或是一笑置之。",-1),Z=a("li",null,[s("关于在程序整个生命周期重复利用待机生产者这件事，已通过不同入口发送消息测试，做法是有效的。"),a("br"),a("img",{src:B,alt:"31475eb24123b64f678e6ebe47ff4960.png",loading:"lazy"}),a("br"),a("img",{src:w,alt:"4d00cb17c863fa8eba14d7ae0f34087e.png",loading:"lazy"})],-1),$=a("br",null,null,-1),aa={href:"https://toscode.gitee.com/singularity9826/rocket-test",target:"_blank",rel:"noopener noreferrer"},sa=a("br",null,null,-1),na={href:"https://github.com/singular9862/rocket-test",target:"_blank",rel:"noopener noreferrer"};function ea(ta,ca){const n=c("ExternalLinkIcon");return o(),p("div",null,[P,j,K,T,U,D,a("p",null,[s("   回到RocketMQ，RocketMQ是消息中间件之一，市面上常见的消息中间件是3Q1K，分别是ActiveMQ，RabbitMQ，RocketMQ，Kafka。其中，RocketMQ由阿里孕育，具体对比可参考RocketMQ官网文档首页提供表格"),a("a",G,[s("https://rocketmq.apache.org/docs/4.x/"),e(n)])]),H,F,a("p",null,[s("   上文介绍RocketMQ的主要应用场景，关于RocketMQ的安装下载，互联网有很多资源，此处就不多做赘述。而关于RocketMQ的使用，主要推荐两处文档"),a("a",Y,[s("rocket官网中文文档"),e(n)]),s("，以及"),a("a",J,[s("gitee中文使用指南"),e(n)]),s("，这两处资料都详实细致，笔者在此处就不多画蛇添足。")]),W,a("ul",null,[X,Z,a("li",null,[s("源码地址"),$,a("a",aa,[s("gitee"),e(n)]),sa,a("a",na,[s("github"),e(n)])])])])}const la=t(O,[["render",ea],["__file","RocketMQ消息收发基本框架的搭建.html.vue"]]);export{la as default};
