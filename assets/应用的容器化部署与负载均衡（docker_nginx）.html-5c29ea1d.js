import{_ as e,X as n,Y as s,a0 as i}from"./framework-1e27cadd.js";const a="/assets/3255d01c9b994b83b2eab5e92021789a-e116e057.png",d="/assets/987ef38156dd47a7b9a3a957c1b918f2-341c25ff.png",r="/assets/d340d2efabeb492ab229b56c22c9dbea-2f8f2a9b.png",l="/assets/15db6406ee20459690bb530812ef8efe-93f04941.png",c="/assets/fbc38df364584fedae111ec08149582c-47808487.png",t="/assets/7c1b93eb3e194203959161eb575798eb-789a1b61.png",v="/assets/a620513583bc4fdd97ae2b7db2907d72-9973df4b.png",o="/assets/6a1570ca65fc4975badf60d7f26ee324-0e015ee4.png",b="/assets/aa2b611ff77b455a9768b243a8a2ca81-13314a48.png",u="/assets/c25136919b1f4a9eb9d8a96cbead2bb2-f2d30e49.png",m="/assets/810d9a3bec9f4014891f70f0f001bf3a-6181d126.png",p="/assets/6f1a6bfa288940af8e414ffa2c0b0183-1af98016.png",g={},f=i(`<hr><h2 id="应用容器化" tabindex="-1"><a class="header-anchor" href="#应用容器化" aria-hidden="true">#</a> 应用容器化</h2><hr><p>    应用容器化，不去看网络上通篇八股，笔者个人认为就是将一个应用放到一个能支撑它正常运行的环境中，这个环境可移植，可重复利用。则这个环境就可以理解为容器。     应用容器化的意义在于可以使应用在不同型号，不同内存大小，不同处理器的计算机上完美移植。无需再考虑繁复的环境配置以及应用部署。制作好镜像后，只需要运行一个容器即可，搭配镜像仓库，则只需要登录镜像仓库，即可方便快捷地将自己的应用部署在计算机上。     关于容器化的妙用不再赘述，笔者在此处也不过多叙述容器化的原理。此处引用docker容器技术，docker的妙处无以言表，不过多嘴一句，尽量上虚拟机的docker应用，docker的桌面级应用docker desktop只能说又大又烂，慎用。此处笔者电脑为m1芯片，安装不了centos7，因此使用docker desktop。</p><hr><h2 id="应用构建镜像并运行容器" tabindex="-1"><a class="header-anchor" href="#应用构建镜像并运行容器" aria-hidden="true">#</a> 应用构建镜像并运行容器</h2><p>dockerfile文件</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment">#</span>
<span class="token comment"># Package stage</span>
<span class="token comment">#</span>
<span class="token instruction"><span class="token keyword">FROM</span> tomcat:8-jre8-alpine</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /ssfServerDev</span>


<span class="token instruction"><span class="token keyword">COPY</span> /ssfServerDev /usr/local/tomcat/webapps/ssfServerDev</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;catalina.sh&quot;</span>, <span class="token string">&quot;run&quot;</span>]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>    非maven项目，直接将整个应用包放到容器内的tomcat下的webapps下即可。 而后在同层目录下直接使用docker build命令构建镜像即可</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker build -t ssfserver .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+a+`" alt="3255d01c9b994b83b2eab5e92021789a.png" loading="lazy">     此为构建好的镜像，通过docker启动容器即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run --name ssfserver1 -p 8071:8080 -d ssfserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+d+'" alt="e17ee3cf87aec6593ec9fb8e1c873cf8.png" loading="lazy">     访问0.0.0.0:8071/ssfServerDev/或127.0.0.1:8071/ssfServerDev/或/localhost:8071/ssfServerDev/或192.168.0.107:8071/ssfServerDev/（192.168.0.107亦为本机ip） <img src="'+r+`" alt="559e67e892001d64bacc7fbf00a03de8.png" loading="lazy">     这里的首页笔者调过，是为后面nginx做负载均衡方便查看。</p><hr><h2 id="nginx做负载均衡" tabindex="-1"><a class="header-anchor" href="#nginx做负载均衡" aria-hidden="true">#</a> nginx做负载均衡</h2><p>    负载均衡在此处的出现，牵扯到另一个业务场景。笔者所在的项目偶有发生这样的情况，某时改的代码未经充分测试，就升级到生产环境，致使生产环境出现短暂不可用的情况，如此一来就会造成生产系统短暂的不可用。     另一方面，我所在的项目尚未遇到，但也迟早会遇见，即随着项目推广的进行，访问量日益增加，单台应用亦或是单台容器已难以为继，但如果部署另外的应用，对用户来说也不友好，这时nginx的作用就体现出来了。     nginx的反向代理和负载均衡，可以使用户先行访问nginx服务器，再按照策略分配到各应用上，这样一来，单台应用的不可用，也不会造成应用大面积不可用。     nginx的安装不做赘述。这里只提及一点，nginx较常见的做法是将配置文件从容器中挂载出来，笔者为保证容器的隔离性，采用现将容器内配置文件复制出来，编辑完成后再复制回容器的做法。具体命令为</p><div class="language-linux line-numbers-mode" data-ext="linux"><pre class="language-linux"><code>#将宿主机文件复制到容器内
docker cp [宿主机文件路径] [CONTAINER ID]:[容器内目标目录路径]
#将容器内文件复制到宿主机
docker cp [CONTAINER ID]:[容器内目标目录路径] [宿主机文件路径]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我的nginx.conf为</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;
                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;
                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    # include /etc/nginx/conf.d/*.conf;

    upstream ssfServer{
            # hash &amp;request_uri;
            server 192.168.0.107:8071 weight=6;
            server 192.168.0.107:8081 weight=2;
            server 192.168.0.107:8091 weight=2;
	}
    server {
        listen       80 ;
        server_name  10.88.116.145;
        location  / {
            proxy_pass http../../images//ssfServer;
        }
    }
     
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>    将配置文件复制到容器内部启动nginx,由于刚启动ssfserver1，因此会直接转发到改tomcat上 <img src="`+l+`" alt="7021e9891bbffcc2298136962df118ea.png" loading="lazy"> 另外启动几台容器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run --name ssfserver2 -p 8081:8080 -d ssfserver
docker run --name ssfserver3 -p 8091:8080 -d ssfserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>    一般来说，一个集群的容器以三台为最佳，因为当其中某一台机子挂掉之后。 2/3的可用性是高于1/2的，至于3/4，则又需要从成本角度考虑。因而这里部署三台。 <img src="`+c+'" alt="b579bc8291a57253eec7030458d22339.png" loading="lazy"> 另外，我刚才在nginx的配置文件中是配置了策略的，大致意思是10次访问server1中6次，server2和server3各中2次，当然还有其他诸多策略，不做赘述。 此处放置五次访问的截图。 访问路径为统一为：http../../images//192.168.0.107/ssfServerDev/</p><p>1.<img src="'+t+'" alt="fda451710ec7906f914d9529d728310f.png" loading="lazy"> 2.<img src="'+v+'" alt="75e11d25325c9d22f14907162e5a0973.png" loading="lazy"> 3.<img src="'+o+'" alt="54ef89fc1cc457cdde418fbcc50adf64.png" loading="lazy"> 4.<img src="'+b+'" alt="38aebef17205f15bb95bdaff69f34b54.png" loading="lazy"> 5.<img src="'+u+'" alt="9c68ce1e47998bb588ca897e0a320f73.png" loading="lazy"> 基本符合负载配重。 停掉一台应用 <img src="'+m+'" alt="a658b98780e5d576dd0a0f2ca22ef4b9.png" loading="lazy">用户无感，仍可正常访问 <img src="'+p+'" alt="7fcd6457ed25fd2a353e2c804617de3e.png" loading="lazy"></p>',23),_=[f];function k(h,x){return n(),s("div",null,_)}const q=e(g,[["render",k],["__file","应用的容器化部署与负载均衡（docker_nginx）.html.vue"]]);export{q as default};
