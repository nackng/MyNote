##商品范围线下品类
```
jsp:
<div class="col-md-4" style="overflow:scroll">
                                <table class="table table-striped table-bordered table-hover" id="offLineCateTable">
                                    <thead>
                                        <tr>
                                          <th ><input type='checkbox' id='checkCateAll'/></th>
                                          <th >品类编码</th>
                                          <th >品类名称</th>
                                          <th >供应商承担比例</th>
                                        </tr>
                                    </thead>    
                                    <tbody>
                                        <tr>
                                          <td><input type='checkbox' name='checkCate' value='0'/>
                                          <td >1</td>
                                          <td >1</td>
                                          <td >1</td>
                                        </tr>
                                        <tr>
                                          <td><input type='checkbox' name='checkCate' value='1'/>
                                          <td >2</td>
                                          <td >2</td>
                                          <td >2</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-4">
                                <a href="#" id="batchImportCate" role="button" class="btn green" data-target="#modal_import" data-toggle="modal">批量导入</a>
                                <button id="addOfflineCate" type="button" class="btn green" onclick="addOfflineCate()">添加品类</button>
                                <button id="delOfflineCate" type="button" class="btn green" onclick="delOfflineCate()">删除所选</button>
                            </div>
                            
```