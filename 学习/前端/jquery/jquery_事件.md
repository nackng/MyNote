##在文本或密码输入时禁止空格键
```


在很多表格领域都不需要空格键，例如，电子邮件，用户名，密码等等等。这里是一个简单的技巧可以用于在选定输入中禁止空格键。
$('input.nospace').keydown(function(e) {
	if (e.keyCode == 32) {
		return false;
	}
});
```

