import{B as n,s as t,r as c}from"./helpers.a01dd0e0.js";import"./vue.esm-bundler.e561c7c1.js";import"./index.c1377b41.js";import"./iframe.83217c2f.js";import"./make-decorator.2bd327bd.js";const o={type:{options:["button","submit","reset"]},appearance:{options:["standard","ghost","accent"]},disabled:{value:!1},waiting:{value:!1},default:{category:"slots",value:"Button"},icon:{category:"slots"}},d={component:n,args:t.args(o),argTypes:t.argTypes(n,o)},s=t.template(n,o,"<Button {{props}} {{events}}>{{slots}}</Button>"),B=t.story(s,{type:"button",appearance:"standard"}),g=t.story(s,{type:"button",appearance:"ghost"}),v=t.story(s,{type:"button",appearance:"accent"}),e=c("icon","\u{1F60A}"),a=c("icon","\u2714\uFE0F"),b=t.compoundStory(n,o,`
    <div class="grid grid-flow-row gap-10">
      <small class="-mb-8 text-center">Standard</small>
      <div class="grid grid-flow-col gap-4">
        <Button {{events}}>Text</Button>
        <Button {{events}}>${e}With Icon</Button>
        <Button {{events}} aria-label="Check">${a}</Button>
        <Button disabled {{events}}>Text</Button>
        <Button disabled {{events}}>${e}With Icon</Button>
        <Button disabled aria-label="Check" {{events}}>${a}</Button>
        <Button waiting aria-label="Loading" {{events}} />
      </div>

      <small class="-mb-8 text-center">Ghost</small>
      <div class="grid grid-flow-col gap-4">
        <Button appearance="ghost" {{events}}>Text</Button>
        <Button appearance="ghost" {{events}}>${e}With Icon</Button>
        <Button appearance="ghost" aria-label="Check" {{events}}>${a}</Button>
        <Button appearance="ghost" disabled {{events}}>Text</Button>
        <Button appearance="ghost" disabled {{events}}>${e}With Icon</Button>
        <Button appearance="ghost" aria-label="Check" disabled {{events}}>${a}</Button>
        <Button appearance="ghost" aria-label="Loading" waiting {{events}} />
      </div>

      <small class="-mb-8 text-center">Accent</small>
      <div class="grid grid-flow-col gap-4">
        <Button appearance="accent" {{events}}>Text</Button>
        <Button appearance="accent" {{events}}>${e}With Icon</Button>
        <Button appearance="accent" aria-label="Check" {{events}}>${a}</Button>
        <Button appearance="accent" disabled {{events}}>Text</Button>
        <Button appearance="accent" disabled {{events}}>${e}With Icon</Button>
        <Button appearance="accent" aria-label="Check" disabled {{events}}>${a}</Button>
        <Button appearance="accent" aria-label="Loading" waiting {{events}} />
      </div>
    </div>
  `),h=["Standard","Ghost","Accent","AllAppearances"];export{v as Accent,b as AllAppearances,g as Ghost,B as Standard,h as __namedExportsOrder,d as default};
//# sourceMappingURL=Button.stories.2b93836d.js.map
