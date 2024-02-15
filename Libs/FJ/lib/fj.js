function $appendHtml(tag, isAutoClosed, attrs, content) {
    // resolve attrs
    
    const allAttrs = attrs.split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[']*'){2})*[']*$)/g);
    let attrsStr = '';
    for (let i = 0; i < allAttrs.length; i++) {
        allAttrs[i].charAt(0) === '.' 
            ? attrsStr = addClass(attrsStr, allAttrs[i].slice(1))
        : allAttrs[i].charAt(0) === '#'
            ? attrsStr += `id="${allAttrs[i].slice(1)}"`
        : attrsStr += allAttrs[i];   
    }

    if (isAutoClosed) {
        document.documentElement.innerHTML += `<${tag} ${attrsStr}>`;
    } else if (attrs.trim() === '/') {
        document.documentElement += '';
    }

    function addClass(target, className) {
        /class="/.test(target)
            ? target = target.replace(/class="/, `class="${className}`) 
            : target += `class="${className}"`;
        return target;
    }
}


function $a(attrs, content) {$appendHtml('a', false, attrs, content)}
function $abbr(attrs, content) {$appendHtml('abbr', false, attrs, content)}
function $address(attrs, content) {$appendHtml('address', false, attrs, content)}
function $area(attrs, content) {$appendHtml('area', true, attrs, content)}
function $article(attrs, content) {$appendHtml('article', false, attrs, content)}
function $aside(attrs, content) {$appendHtml('aside', false, attrs, content)}
function $audio(attrs, content) {$appendHtml('audio', false, attrs, content)}
function $b(attrs, content) {$appendHtml('b', false, attrs, content)}
function $base(attrs, content) {$appendHtml('base', false, attrs, content)}
function $bdi(attrs, content) {$appendHtml('bdi', false, attrs, content)}
function $bdo(attrs, content) {$appendHtml('bdo', false, attrs, content)}
function $blockquote(attrs, content) {$appendHtml('blockquote', false, attrs, content)}
function $body(attrs, content) {$appendHtml('body', false, attrs, content)}
function $br(attrs, content) {$appendHtml('br', true, attrs, content)}
function $button(attrs, content) {$appendHtml('button', false, attrs, content)}
function $canvas(attrs, content) {$appendHtml('canvas', false, attrs, content)}
function $caption(attrs, content) {$appendHtml('caption', false, attrs, content)}
function $cite(attrs, content) {$appendHtml('cite', false, attrs, content)}
function $code(attrs, content) {$appendHtml('code', false, attrs, content)}
function $col(attrs, content) {$appendHtml('col', true, attrs, content)}
function $colgroup(attrs, content) {$appendHtml('colgroup', false, attrs, content)}
function $data(attrs, content) {$appendHtml('data', false, attrs, content)}
function $datalist(attrs, content) {$appendHtml('datalist', false, attrs, content)}
function $dd(attrs, content) {$appendHtml('dd', false, attrs, content)}
function $del(attrs, content) {$appendHtml('del', false, attrs, content)}
function $details(attrs, content) {$appendHtml('details', false, attrs, content)}
function $dfn(attrs, content) {$appendHtml('dfn', false, attrs, content)}
function $dialog(attrs, content) {$appendHtml('dialog', false, attrs, content)}
function $div(attrs, content) {$appendHtml('div', false, attrs, content)}
function $dl(attrs, content) {$appendHtml('dl', false, attrs, content)}
function $dt(attrs, content) {$appendHtml('dt', false, attrs, content)}
function $em(attrs, content) {$appendHtml('em', false, attrs, content)}
function $embed(attrs, content) {$appendHtml('embed', true, attrs, content)}
function $fieldset(attrs, content) {$appendHtml('fieldset', false, attrs, content)}
function $figcaption(attrs, content) {$appendHtml('figcaption', false, attrs, content)}
function $figure(attrs, content) {$appendHtml('figure', false, attrs, content)}
function $footer(attrs, content) {$appendHtml('footer', false, attrs, content)}
function $form(attrs, content) {$appendHtml('form', false, attrs, content)}
function $h1(attrs, content) {$appendHtml('h1', false, attrs, content)}
function $h2(attrs, content) {$appendHtml('h2', false, attrs, content)}
function $h3(attrs, content) {$appendHtml('h3', false, attrs, content)}
function $h4(attrs, content) {$appendHtml('h4', false, attrs, content)}
function $h5(attrs, content) {$appendHtml('h5', false, attrs, content)}
function $h6(attrs, content) {$appendHtml('h6', false, attrs, content)}
function $head(attrs, content) {$appendHtml('head', false, attrs, content)}
function $hgroup(attrs, content) {$appendHtml('hgroup', false, attrs, content)}
function $hr(attrs, content) {$appendHtml('hr', true, attrs, content)}
function $html(attrs, content) {$appendHtml('html', false, attrs, content)}
function $i(attrs, content) {$appendHtml('i', false, attrs, content)}
function $iframe(attrs, content) {$appendHtml('iframe', false, attrs, content)}
function $img(attrs, content) {$appendHtml('img', true, attrs, content)}
function $input(attrs, content) {$appendHtml('input', true, attrs, content)}
function $ins(attrs, content) {$appendHtml('ins', false, attrs, content)}
function $kbd(attrs, content) {$appendHtml('kbd', false, attrs, content)}
function $label(attrs, content) {$appendHtml('label', false, attrs, content)}
function $legend(attrs, content) {$appendHtml('legend', false, attrs, content)}
function $li(attrs, content) {$appendHtml('li', false, attrs, content)}
function $link(attrs, content) {$appendHtml('link', true, attrs, content)}
function $main(attrs, content) {$appendHtml('main', false, attrs, content)}
function $map(attrs, content) {$appendHtml('map', false, attrs, content)}
function $mark(attrs, content) {$appendHtml('mark', false, attrs, content)}
function $meta(attrs, content) {$appendHtml('meta', true, attrs, content)}
function $meter(attrs, content) {$appendHtml('meter', false, attrs, content)}
function $nav(attrs, content) {$appendHtml('nav', false, attrs, content)}
function $noscript(attrs, content) {$appendHtml('noscript', false, attrs, content)}
function $object(attrs, content) {$appendHtml('object', false, attrs, content)}
function $ol(attrs, content) {$appendHtml('ol', false, attrs, content)}
function $optgroup(attrs, content) {$appendHtml('optgroup', false, attrs, content)}
function $option(attrs, content) {$appendHtml('option', false, attrs, content)}
function $output(attrs, content) {$appendHtml('output', false, attrs, content)}
function $p(attrs, content) {$appendHtml('p', false, attrs, content)}
function $param(attrs, content) {$appendHtml('param', true, attrs, content)}
function $picture(attrs, content) {$appendHtml('picture', false, attrs, content)}
function $pre(attrs, content) {$appendHtml('pre', false, attrs, content)}
function $progress(attrs, content) {$appendHtml('progress', false, attrs, content)}
function $q(attrs, content) {$appendHtml('q', false, attrs, content)}
function $rp(attrs, content) {$appendHtml('rp', false, attrs, content)}
function $rt(attrs, content) {$appendHtml('rt', false, attrs, content)}
function $ruby(attrs, content) {$appendHtml('ruby', false, attrs, content)}
function $s(attrs, content) {$appendHtml('s', false, attrs, content)}
function $samp(attrs, content) {$appendHtml('samp', false, attrs, content)}
function $script(attrs, content) {$appendHtml('script', false, attrs, content)}
function $section(attrs, content) {$appendHtml('section', false, attrs, content)}
function $select(attrs, content) {$appendHtml('select', false, attrs, content)}
function $small(attrs, content) {$appendHtml('small', false, attrs, content)}
function $source(attrs, content) {$appendHtml('source', true, attrs, content)}
function $span(attrs, content) {$appendHtml('span', false, attrs, content)}
function $strong(attrs, content) {$appendHtml('strong', false, attrs, content)}
function $style(attrs, content) {$appendHtml('style', false, attrs, content)}
function $sub(attrs, content) {$appendHtml('sub', false, attrs, content)}
function $summary(attrs, content) {$appendHtml('summary', false, attrs, content)}
function $sup(attrs, content) {$appendHtml('sup', false, attrs, content)}
function $svg(attrs, content) {$appendHtml('svg', false, attrs, content)}
function $table(attrs, content) {$appendHtml('table', false, attrs, content)}
function $tbody(attrs, content) {$appendHtml('tbody', false, attrs, content)}
function $td(attrs, content) {$appendHtml('td', false, attrs, content)}
function $template(attrs, content) {$appendHtml('template', false, attrs, content)}
function $textarea(attrs, content) {$appendHtml('textarea', false, attrs, content)}
function $header(attrs, content) {$appendHtml('header', false, attrs, content)}
function $hgroup(attrs, content) {$appendHtml('hgroup', false, attrs, content)}
function $hr(attrs, content) {$appendHtml('hr', true, attrs, content)}
function $html(attrs, content) {$appendHtml('html', false, attrs, content)}
function $i(attrs, content) {$appendHtml('i', false, attrs, content)}
function $iframe(attrs, content) {$appendHtml('iframe', false, attrs, content)}
function $img(attrs, content) {$appendHtml('img', true, attrs, content)}
function $input(attrs, content) {$appendHtml('input', true, attrs, content)}
function $ins(attrs, content) {$appendHtml('ins', false, attrs, content)}
function $kbd(attrs, content) {$appendHtml('kbd', false, attrs, content)}
function $label(attrs, content) {$appendHtml('label', false, attrs, content)}
function $legend(attrs, content) {$appendHtml('legend', false, attrs, content)}
function $li(attrs, content) {$appendHtml('li', false, attrs, content)}
function $link(attrs, content) {$appendHtml('link', true, attrs, content)}
function $main(attrs, content) {$appendHtml('main', false, attrs, content)}
function $map(attrs, content) {$appendHtml('map', false, attrs, content)}
function $mark(attrs, content) {$appendHtml('mark', false, attrs, content)}
function $meta(attrs, content) {$appendHtml('meta', true, attrs, content)}
function $meter(attrs, content) {$appendHtml('meter', false, attrs, content)}
function $nav(attrs, content) {$appendHtml('nav', false, attrs, content)}
function $noscript(attrs, content) {$appendHtml('noscript', false, attrs, content)}
function $object(attrs, content) {$appendHtml('object', false, attrs, content)}
function $ol(attrs, content) {$appendHtml('ol', false, attrs, content)}
function $optgroup(attrs, content) {$appendHtml('optgroup', false, attrs, content)}
function $option(attrs, content) {$appendHtml('option', false, attrs, content)}
function $output(attrs, content) {$appendHtml('output', false, attrs, content)}
function $p(attrs, content) {$appendHtml('p', false, attrs, content)}
function $param(attrs, content) {$appendHtml('param', true, attrs, content)}
function $picture(attrs, content) {$appendHtml('picture', false, attrs, content)}
function $pre(attrs, content) {$appendHtml('pre', false, attrs, content)}
function $progress(attrs, content) {$appendHtml('progress', false, attrs, content)}
function $q(attrs, content) {$appendHtml('q', false, attrs, content)}
function $rp(attrs, content) {$appendHtml('rp', false, attrs, content)}
function $rt(attrs, content) {$appendHtml('rt', false, attrs, content)}
function $ruby(attrs, content) {$appendHtml('ruby', false, attrs, content)}
function $s(attrs, content) {$appendHtml('s', false, attrs, content)}
function $samp(attrs, content) {$appendHtml('samp', false, attrs, content)}
function $script(attrs, content) {$appendHtml('script', false, attrs, content)}
function $section(attrs, content) {$appendHtml('section', false, attrs, content)}
function $select(attrs, content) {$appendHtml('select', false, attrs, content)}
function $small(attrs, content) {$appendHtml('small', false, attrs, content)}
function $source(attrs, content) {$appendHtml('source', true, attrs, content)}
function $span(attrs, content) {$appendHtml('span', false, attrs, content)}
function $strong(attrs, content) {$appendHtml('strong', false, attrs, content)}
function $style(attrs, content) {$appendHtml('style', false, attrs, content)}
function $sub(attrs, content) {$appendHtml('sub', false, attrs, content)}
function $summary(attrs, content) {$appendHtml('summary', false, attrs, content)}
function $sup(attrs, content) {$appendHtml('sup', false, attrs, content)}
function $svg(attrs, content) {$appendHtml('svg', false, attrs, content)}
function $table(attrs, content) {$appendHtml('table', false, attrs, content)}
function $tbody(attrs, content) {$appendHtml('tbody', false, attrs, content)}
function $td(attrs, content) {$appendHtml('td', false, attrs, content)}
function $template(attrs, content) {$appendHtml('template', false, attrs, content)}
function $textarea(attrs, content) {$appendHtml('textarea', false, attrs, content)}
function $tfoot(attrs, content) {$appendHtml('tfoot', false, attrs, content)}
function $th(attrs, content) {$appendHtml('th', false, attrs, content)}
function $thead(attrs, content) {$appendHtml('thead', false, attrs, content)}
function $time(attrs, content) {$appendHtml('time', false, attrs, content)}
function $title(attrs, content) {$appendHtml('title', false, attrs, content)}
function $tr(attrs, content) {$appendHtml('tr', false, attrs, content)}
function $track(attrs, content) {$appendHtml('track', true, attrs, content)}
function $u(attrs, content) {$appendHtml('u', false, attrs, content)}
function $ul(attrs, content) {$appendHtml('ul', false, attrs, content)}
function $var(attrs, content) {$appendHtml('var', false, attrs, content)}
function $video(attrs, content) {$appendHtml('video', false, attrs, content)}
function $wbr(attrs, content) {$appendHtml('wbr', false, attrs, content)}
