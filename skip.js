/* Skip With No Reason (Branding pick 39, daily deck 2026-10-13): one Skip button, no "why" step.
   Skipped questions are stored as S.a[id].skip and sent through Submit (out().json.answers[].skipped=true). 
   Also lifts the fixed bottom nav above the brand footer (footer was covering Start/Next on short screens). */
(function(){
  var css=document.createElement('style');css.textContent='nav#nav{z-index:10}.opt.fq-skip{border:1px dashed #6B5E50!important;background:#fff!important;color:#6B5E50!important}.opt.fq-skip.on{background:#6B5E50!important;color:#fff!important;border-style:solid!important}';
  document.head.appendChild(css);
  var isSkip=function(q){var a=S.a[q.id];return !!(a&&a.skip&&!answered(q));};
  var _goQ=goQ;
  goQ=function(n,dir){var r=_goQ.apply(this,arguments);var q=QS[n];var el=q&&document.querySelector('#m .fq-sheet[data-q="'+q.id+'"]');
    if(!el)return r;var opts=el.querySelector('.opts');if(!opts||opts.querySelector('.fq-skip'))return r;
    var b=document.createElement('button');b.type='button';b.className='opt fq-skip'+(isSkip(q)?' on':'');b.textContent=isSkip(q)?'Skipped':'Skip';
    b.onclick=function(){var a=S.a[q.id]=S.a[q.id]||{v:[]};if(isSkip(q)){delete a.skip;save();goQ(n);return}
      a.v=[];a.unsure=false;a.skip=true;save();goQ(n+1,1)};
    opts.appendChild(b);
    el.querySelectorAll('.opt:not(.fq-skip)').forEach(function(o){o.addEventListener('click',function(){var a=S.a[q.id];if(a)delete a.skip;},true)});
    return r};
  var _out=out;
  out=function(){var o=_out.apply(this,arguments);var sk=QS.filter(isSkip);
    if(sk.length){var L=o.text.split('\n');L.push('','SKIPPED ('+sk.length+')');
      sk.forEach(function(q){L.push('- '+q.room+' / '+q.q+' Skipped');o.json.answers.push({room:q.room,id:q.id,question:q.q,choice:[],skipped:true,status:'skipped'})});
      o.text=L.join('\n');}
    o.json.skipped=sk.length;return o};
  window.__out=out;
})();
