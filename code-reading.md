### format numbers
```python
def int_with_commas(x):
    # edge case
    # if x == 0:
    #   return str(x)
    if x < 0:
        return '-' + int_with_commas(-x)
    # build up string backwards
    result = []
    while x > 0:
        if len(result) % 4 == 3:
            result.append(',')
        result.append(str(x % 10))
        x //= 10
    return ''.join(reversed(result))
``` 

What language is this?
- Python
What does this code do? For instance what does `int_with_commas(-1000000)` return?
- It formats the input number with commas at hundreds positions. That call will return -1,000,000.
What does `str(x % 10)` do? What about `x //= 10`?
- `str(x%10)` stringifies the remainder of `x / 10`. `x //= 10` is `x / 10` but rounded down (floor).
Why are we doing len(result) % 4 == 3?
- It is to check if the current number of digits is has a remainder of 3, if it is then add a comma.
There is an edge case that will lead to the wrong output. What is it? How can we fix it?
- An edge case is that there is no coverage for `0` input. Currently it will not output anything. We can fix it by returning `0` if a `0` is supplied as the input.

### array function

The name of this function is intentionally removed. See if you can figure out what it does.
```js
function foo(a) {
  for (var i = 0; i < a.length; i++) {
    var r = Math.floor(Math.random() * (i + 1));
    var t = a[i];
    a[i] = a[r];
    a[r] = t;
  }
  return a;
}
```

What language is this?
- Javascript
What happens on the third line? What is the range of `Math.random()`?
- The third line return a random number between `0` and `i + 1`. The range of `Math.random()` is `0` and `1`.
If `i == 10` then what are the possible values for `r`?
- Possible values for `r` will be any number between `0` and `11` (exclusive).
What does this function do? What would you call it?
- This function randomizes the order of the values in array. I would call it `randomize`.
What’s a use case for this? What’s a real world example where you might want to use this?
- A use case / real world example is if you want to randomize a game board or game inputs when initializing a round.

### Reduce

Consider this function:
```js
function arrayReduce(array, iteratee, initAccum) {
  var index = -1, length = array.length, accumulator = initAccum;
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index]);
  }
  return accumulator;
}
```

What is the code below going to evaluate to?
- It will evaluate to 13.

```js
arrayReduce(
  [7, 2, 4],
  function(a, b) { return a + b; },
  0
);
```

What about this code below?
- It will evaluate to `[0,1,1,2,3,3,4,5,5,6...]` (1 of each even number and 2 of each odd number)

```js
var input = [];
for (var i = 0; i < 10000; i++) {
 input.push(i % 2 == 0 ? [i] : [i, i]);
}
var result = arrayReduce(input, function(a, b) { return a.concat(b); }, []);
```

Is there something potentially bad about the code above?
- There's nothing potentially bad about it, but the new array output will be 1.5 times the length of the original length. Instead of using `arrayReduce` to concat everything you can just push a spread of the array values in like this:
```js
const value = i % 2 == 0 ? [i] : [i, i];
input.push(...i);
```

`git push origin master`
- What does this command do?
It pushes your current local branch to a remote master branch.
- Sometimes it fails with a message that looks something like this: ! [rejected] master ->
master (fetch first). Why?
A failure like that will mean that the remote master branch is currently ahead (in terms of commits) compared to your local master branch. If that is the case you should pull down the latest master, rebase or merge, then push your latest changes up.
- In that case you can use the --force flag. What does that flag do?
The `--force` flag essentially overwrites a remote branch with the local branch you're pushing.
- Why is the --force flag often bad to use?
It is often because if the remote branch has newer commits (bug fixes, features, etc.) and your local branch is behind it, you will effectively overwrite any newer commits in the remote branch and replace it with your local branch.
- When would it require the --tags flag?
You will require the `--tags` flag when you are publishing releases and will want to tag it with specific versions of the release.

`git reset --hard HEAD`
- What does this command do?
This command will reset the HEAD commit from your staging area locally. Essentially what this means is if you have a commit that is ahead of a remote branch locally, you can "undo" the commit.
- What does HEAD mean?
HEAD means the latest commit, or the "head" commit that you've made.
- What does --hard mean here?
The `--hard` flag will mean that it will overwrite any uncommitted changes in your working directory.
- What happens if you don’t provide --hard?

### UNIX commands

What do these commands do? How do they work?
1. ln -s /var/log/syslog syslog; tail -f syslog | grep mail
- What do the above commands do?
The first command `ln` symlinks the file directory in the longer path into the current directory's `syslog`. It is useful for making a file or directory seem like it is within a specific path without moving or making copies of it. The second command is to output the last 10 (default) lines of a file and pipe it into a `grep` command to search the output for any lines that has text "mail".
- What does the ln command do? What would be the effect of omitting the -s flag?
The `ln` command "places" a specific file or directory in another directory so that you may access its contents without having to duplicate it. It is also a good way to alias the content, especially if the source's directory is a long path.
- What does tail do? What does the -f flag do?
The `tail` command outputs / prints out the last `n` number of lines from a specific file. The `-f` flag will watch for any updates within that file and will print out them if there are. (Typical use is to watch logs in real-time).
- What will happen if you run the command twice?

2. npm build 2> /dev/null | less
- What do the above commands do?
The command runs a npm command called "build" which will likely be defined in a `package.json` file outputs it into a new file called `null` then run the output through a less compiler.
- What is 2>?
Not sure...is it to point the output to a specific directory or file?
- What is /dev/null?
It is a file directory `dev` with a file named `null`...?
- What is less?
It is an extended language for CSS and will compile into CSS stylesheets when built.
- What is this useful for?
It is useful for development purposes because it's a more condensed / simpler way of writing CSS.
- What is npm?
It is a package manager for Node-base applications.

3. mkdir -p foo && touch foo/bar && printf '#!/bin/sh\nenv' > foo/bar && chown -R $USER: foo && ./foo/bar
- Why use printf instead of echo?
`printf` has more control over output format?
- Are all the commands necessary?
No, `chown -R` will recursively change owners within `foo` so you don't need `&& ./foo/bar`.
- What happens when they’re executed?
Nothing or an error should be printed.
- What’s missing to make this work?
I think it will be a missing user group after `$USER:` since it has the `:` (colon).
- What do the above commands do?
It creates a new directory named `foo` then create a file named `bar` within `foo`. It will then print the contents of `nenv` (likely some env variables) into the new file `bar`. Lastly it will try to update the owner of the new directory `foo` with a user and user group. (`-p` will create the directory, along with the directories that lead to the directory you want to create, and would ignore any errors if the directory already exists).
- What should this output when it’s working?
It should output a new file with an assigned owner and group.

4. ps aux | grep foo | grep -v grep | awk '{print $2}' | xargs kill
- What does the above command do?
It prints process statuses then finds any process currently running named `foo`, then exclude the search command you've just run by using `grep -v grep`, prints out the process and then finally kills it.
- What’s in the second column of ps aux?
The second column is the process ID.
- Why are we doing grep -v grep and what does the -v flag do?
It is to exclude the current `grep` process. The `-v` flag is to denote an exclusion - in this case exclude the `grep` process.
- How does xargs work?
It takes the previous output from the pipes and feeds it into another command as arguments.

### Regular expressions

(assume Perl compatible regular expressions)

1. [a-z]*@[a-z]\.[a-z]+
The above regex is meant to match emails. What are some issues with it and how would you fix
them?
- This regex excludes capital letters. Change to `[A-Za-z]`
- The `*` allows for `0` values found (meaning `@email.com` will be valid). Change it to a `+`.
- The second section `@[a-z]` is missing the `+` token because it currently will only match one character (i.e. `jeff@e` will be matched).
- This regex also excludes number and a few other special character values that can be in emails.

### HTML

```html
<a href="#example" title="Example" target="_blank">example</a>
```

- What do the title and target attributes do in the snippet above? What happens when you click on
or hover over the link?
The `title` gives the link a tooltip so that if you hover over the link it a little tooltip will pop up next to it with the text "Example". The `target` attribute tells the link where to open the link. `"_blank"` tells the browser to open it in a new tab when you click on it.

```html
<em>Click <b>here</b></em><br></br>
```

- What does the em tag above do? What are some issues with this code?
The `em` tag tells the browser that the content inside it should be given emphasis. An issue with this code is that the last `br` tag should not have a leading slash. Another issue is that the content, coupled with the tags is misleading. Specifically "here" is wrapped in bold tags which will make the user think it is clickable, but it isn't.

```html
<form action="example.com"></form>
```

- What does the action attribute mean in the snippet above? What request is sent when submitting
this form?
The `action` attribute tells the form which URL will be processes the submitted form data. A POST request is sent when submitting. However, this form has no form inputs so no data will actually be submitted.

### CSS

```css
p {
 font-size: 1.5em;
}
```

- What does em mean in the snippet above? What is the font size for p tags in this document?
`em` is a size unit that is relative to the direct or nearest parent. The font size for p tags in this document is 1.5 the size of whatever the size it's parent is. For example, if the parent of a `p` is `16px`, then the `p` will be `24px`.

```css
div {
 width: 200px;
 margin: 0 auto;
}
```

- What is margin in CSS? What does `margin: 0 auto` do in the snippet above?
Margin in CSS is spacing around a particular element. `margin: 0 auto` will horizontally center an element within it's parent.

```css
#example {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
}
```

- What does `position: absolute` do in the snippet above? How wide is `#example` if it’s a direct
child of the body element?
It will break out the layout of the current element from it's parent. `#example` will have no width because it has broken the layout.

### bisect_left

```python
def bisect_left(a, x, lo=0, hi=None):
  """Return the index where to insert item x in list a, assuming a is sorted.
  The return value i is such that all e in a[:i] have e < x, and all e in
  a[i:] have e >= x. So if x already appears in the list, a.insert(x) will
  insert just before the leftmost x already there.
  Optional args lo (default 0) and hi (default len(a)) bound the
  slice of a to be searched.
  """
  if lo < 0:
    raise ValueError('lo must be non-negative')
  if hi is None:
    hi = len(a)
  while lo < hi:
    mid = (lo+hi)//2
    if a[mid] < x: lo = mid+1
    else: hi = mid
  return lo
```

- What language is this?
Python
- What does it achieve?
It returns an index within a given array which will be used to insert an element.
- How can you be sure that it terminates?
Because it keeps dividing the array into halves until the lo and hi converge, thus breaking the while loop.
- What does bisect_left([1, 5, 6, 9], 7) return?
It should return 3 because that's where 7 will be inserted into the array.
- What about bisect_left([1, 5, 6, 9], 5) return?
It should return 1 because it will return the leftmost 5 value that's already in the array.
- Why is it called bisect_left? What would bisect_right do? What would bisect_right([1, 5, 6, 9], 5) return?
It is called bisect_left because if the value to insert already exists, it'll return the index to the left of the existing value. bisect_right will do the opposite (right side of existing value). bisect_right([1,5,6,9],5) should return 2.
- In general, what are the inputs of a and x where bisect_left and bisect_right return different values?
When x is a value that already exists in a, they both should return different values.

### nested function

```js
function f(n) {
  return n <= 1 ? 1 : n * f(n - 1);
}
function m(f) {
  var c = {};
  return function mf(a) {
    if (c[a] === undefined) {
      c[a] = f(a);
    }
    return c[a];
  }
}
```
- What does f do?
Function `f` multiplies a given number `n` with all integers preceding (before) it. Example: 5(4(3(2(1))))
- What does m do?
Function `m` is a function creator with a privately scoped cache to store values already returned.
- What is mf?
`mf` is a function that returns cached values returned by function `f` (or any function argument). If a particular call has not been made before (i.e. doesn't exist in cache) it will call `f` to get the value, cache it, then return it.
- How would you use m and f together? What would be the result?
You can use it to calculate and cache a large multiplication operation and ensure that each new unique value will only be calculated once.
- What would you change about m to make it support multiple arguments?
If using ES6 spread operators, I would update `mf(a)` to `mf(...a)` so that it transforms an arguments list into an array and then pass in the array into `f` like this: `f(...a)` to pass multiple arguments into `f()`.
If not using ES6, i would remove `a` from `mf(a)` and use the `arguments` keyword to extract the list of args as a list.

### Floodfill

```java
public class FloodFill {
  private static void flood(Picture img, boolean[][] mark, int row, int col, Color srcColor, Color tgtColor) {
    // make sure row and col are inside the image
    if (row < 0) return;
    if (col < 0) return;
    if (row >= img.height()) return;
    if (col >= img.width()) return;
    // make sure this pixel hasn't been visited yet
    if (mark[row][col]) return;
    // make sure this pixel is the right color to fill
    if (!img.get(col, row).equals(srcColor)) return;
    // fill pixel with target color and mark it as visited
    img.set(col, row, tgtColor);
    mark[row][col] = true;
    // recursively fill surrounding pixels
    // (this is equivelant to depth-first search)
    flood(img, mark, row - 1, col, srcColor, tgtColor);
    flood(img, mark, row + 1, col, srcColor, tgtColor);
    flood(img, mark, row, col - 1, srcColor, tgtColor);
    flood(img, mark, row, col + 1, srcColor, tgtColor);
  }
}
```

- What does it do?
It recursively fills surrounding pixels within a given point (row and col) with a target color.
- How does it work?
It takes a point and a target color, checks to see if the current point in the image either: doesn't have the target color yet or if it hasn't been checked yet (recursively) and then updates the color. It then recursively checks both horizontally and vertically until the surrounding area (in-bounds) is filled with the target color.
- Any superfluous code?
I think the only superfluous code is the `mark`ing aspect of it. Once a color is already checked it should already be updated to the target color, therefore it is unecessary to `mark` it.
- What are some issues with this code? How can you fix it?
  - combinding the check if the point is in bounds
  - remove unecessary marking

### Remove spaces

```js
function remove_spaces(str) {
  // Remove all spaces in string
  while (true) {
  var pos = str.indexOf(' ');
  if (pos == -1) break;
    str = str.slice(0, pos) + str.slice(pos+1);
  }
  return str;
}
```

- What’s bad with the implementation?
It is iteratively looping through the entire length of the string (one char at a time) and removing the non-line-breaking whitespace.
- How can it be improved?
It can be improved if we change it to a regex function that can check for multiple combined white spaces. Example: 
`str.replace(/\s+/g, '')`. The `s+` looks ahead for conditions like `hi   my  name  is` and replaces multiple grouped white spaces together.
- What’s the algorithmic complexity?
It is O(n) where n is the length of the string.

### SQL

```sql
CREATE TABLE account (
 id INT PRIMARY KEY,
 type CHAR(5) NOT NULL,
 name VARCHAR(255)
);
CREATE TABLE things (
 id INT PRIMARY KEY,
 account_id INT REFERENCES account(id),
 name VARCHAR
);
INSERT INTO account VALUES (1, 't1', 'John Smith');
INSERT INTO account VALUES (2, 't2', 'Johan Schmidt');
INSERT INTO account VALUES (3, 't3', 'Ivan Kovac');
INSERT INTO things VALUES(1, 1, 'Shoe');
INSERT INTO things VALUES(2, 1, 'Hammer');
-- query #1:
SELECT id, '-' || type || '-' || name FROM account WHERE id = 2;
-- query #2:
SELECT * FROM account a, things t WHERE a.id = t.account_id;
-- query #3:
SELECT * FROM account a LEFT JOIN things t on a.id = t.account_id;
-- query #4:
DELETE FROM account WHERE id = 1;
```

(assumes Oracle, PostgreSQL or generic ANSI SQL)

- What happens if ‘1,’ is omitted from first insert?
If it is omitted, the DB will create an ID for it automatically.
- What is the output of query #1?
It will be a table where there is one row which is has an ID of `2` and column value of `-t2-Johan Schmidt`.
- Subquestion - why choose CHAR vs VARCHAR and what happens during storage and retrieval?
`CHAR` - it will _always_ store characters at the specified length, despite that it may have less than the defined amount. (i.e. it's possible that it will store 'yes  ' with white space if it was defined to have a char length of 5).
`VARCHAR` - basically the same implementation but without this specificity of char length.
- What is the output of query #2?
It will be a table with rows of all `things` that are each mapped to their corresponding `account`, excluding any `things` that do not belong to an `account`.
- What is the output of query #3?
It will be almost the same as query #2 but will include `things` that don't belong to any `account`.
- How else could query #2 be written?
`SELECT * FROM departments AS a JOIN employees AS t ON a.id = t.department_id;`
- Follow up: what kind of join is query #2 and why?

- What is the output of query #4?
The output is the number of deleted rows based on the query.
