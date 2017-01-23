 ##注解@Rule
 ```
 @Rule是JUnit4的新特性。利用@Rule我们可以扩展JUnit的功能，在执行case的时候加入测试者特有的操作，而不影响原有的case代码：减小了特有操作和case原逻辑的耦合。譬如说我们要重复测试某个test方法，当然我们可以在@Test方法里面写循环。但是如果想把循环和测试逻辑分开就可以利用@Rule。我们先实现org.junit.rules.MethodRule接口做实循环逻辑

实例一：
org.databene.contiperf.junit.ContiPerfRule(Implements the JUnit MethodRule interface for adding performance test features to test calls.)

import org.databene.contiperf.PerfTest;
import org.databene.contiperf.junit.ContiPerfRule;
import org.junit.Rule;
import org.junit.Test;

/**
 * 性能测试
 * 
 * @author lry
 */
public class ContiPerfTest {
    
    @Rule
    public ContiPerfRule i = new ContiPerfRule();

    Sequence sequence = new Sequence(0, 0);
    
    @Test
    @PerfTest(invocations = 200000000, threads = 16)
    public void test1() throws Exception {
        sequence.nextId();
    }

}
 ```