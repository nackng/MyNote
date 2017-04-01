##map作为缓存
private static Map<Integer, List<Map<String, Object>>> errorMap = new HashMap<Integer, List<Map<String, Object>>>();

private List<Map<String, Object>> packErrorSheet(List<List<Object>> list, int id, int pageNo, int pageSize) {
    List<Map<String, Object>> resList = new LinkedList<>();
    List<Map<String, Object>> errorList = new LinkedList<>();
    if (list != null && list.size() > 0) {
        if (errorMap == null || !errorMap.containsKey(id)) {
            List<Map<String, Object>> each = new LinkedList<>();
            for (int i = 0; i < list.size(); i++) {
                if (i == 0) {
                    continue;
                }
                List<Object> data = list.get(i);
                String resStr = String.valueOf(data.get(data.size() - 1));
                if (!resStr.equals(SaleCenterConstants.SUCCESS)
                        || !resStr.equals(SaleCenterConstants.SUCCESS + SaleCenterConstants.POINT_STRING)) {
                    Map<String, Object> map = new HashMap<String, Object>();
                    String errCode;
                    if (!NormalUtil.isNullOrEmpty(String.valueOf(data.get(0)))) {
                        errCode = String.valueOf(data.get(0));
                    } else if (!NormalUtil.isNullOrEmpty(String.valueOf(data.get(1)))) {
                        errCode = String.valueOf(data.get(1));
                    } else {
                        errCode = String.valueOf(data.get(2));
                    }
                    map.put("errCode", errCode);
                    map.put("errDesc", resStr);
                    each.add(map);
                }
            }
            errorMap.put(id, each);
            errorList = each;
        } else {
            errorList = errorMap.get(id);
        }
        int begin = 0, end = 0;
        if (pageNo > 0) {
            begin = pageSize * (pageNo - 1);
        } else {
            begin = 0;
        }
        end = begin + pageSize;
        if (end > errorList.size()) {
            end = errorList.size();
        }
        for (int i = begin; i < end; i++) {
            Map<String, Object> data = errorList.get(i);
            resList.add(data);
        }
    }

    return resList;
}

