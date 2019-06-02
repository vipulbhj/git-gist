`<git-gist></git-gist>`
=======================

## What is it :-
git-gist is a custom component which can be used to integrate gist's in your web page, web app and literally anythhing that is WEB stack.

**git-gist** is build using the web component api, which allows the construction of isoloated component which the browser understands natively, meaning you can use them with React, Angular, Vue, the new hyped JS framework and my personal favourite HTML <3.

## How to find the _gist id_ of your gist:-
Well its your lucky day, as its right there in the url when you open up a gist in your browser. The format look like `https://gist.github.com/<your-user-name>/gistid`.    
That _gistid_ is a big long string of numbers mostly that you just need to copy and use as you please.
 
## How to use:- 
Clone this repo or simply just copy the contents of the file `git-gist.js` into your project in a javascript file whose name can be anything but I personally recommend going with the same name.

Now all that's left to do is to include this file in your HTML in the head section using script tag. All you need to do now is to use the tag as you would use any other HTML tag and pass it an attribute called `gist-id` which will point to publically available gists on github. After that lean back and let it do the magic for you.

```
<script src="git-gist.js"></script>

<git-gist gist-id="479c25da5421e398e9dbaf73090936e6"></git-gist>
```

And that's it. :)

# Demo, Yayy!!
Clone or download this project and open up index.html in your favourite browser. Your Welcome
