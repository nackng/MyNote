[TOC]
Spring 的本质系列(1) -- 依赖注入
通过Java反射把各个bean 的实例创建起来,还是通过Java反射调用各个方法。
##关于Bean
Bean的生命周期
如你所见，在bean准备就绪之前，bean工厂执行了若干启动步骤。

Spring对bean进行实例化；
Spring将值和bean的引用注入到bean对应的属性中；
如果bean实现了BeanNameAware接口，Spring将bean的ID传递给setBean-Name()方法；
如果bean实现了BeanFactoryAware接口，Spring将调用setBeanFactory()方法，将BeanFactory容器实例传入；
如果bean实现了ApplicationContextAware接口，Spring将调用setApplicationContext()方法，将bean所在的应用上下文的引用传入进来；
如果bean实现了BeanPostProcessor接口，Spring将调用它们的post-ProcessBeforeInitialization()方法；
如果bean实现了InitializingBean接口，Spring将调用它们的after-PropertiesSet()方法。类似地，如果bean使用init-method声明了初始化方法，该方法也会被调用；
如果bean实现了BeanPostProcessor接口，Spring将调用它们的post-ProcessAfterInitialization()方法；
此时，bean已经准备就绪，可以被应用程序使用了，它们将一直驻留在应用上下文中，直到该应用上下文被销毁；
如果bean实现了DisposableBean接口，Spring将调用它的destroy()接口方法。同样，如果bean使用destroy-method声明了销毁方法，该方法也会被调用。
