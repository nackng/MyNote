[TOC]
##下载zip文件
```
函数的目的是要下载一个文件到指定目录，第一要检查大小，第二要检查是不是 zip 文件，然后下载到指定目录,并且有超时控制。

private File downloadZipFile(Task task) throws DeployScheduleException, IOException {
        LOGGER.debug("#Scheduler#{}#download start", task.getId());
        SocketConfig socketConfig = SocketConfig.custom()
                .setSoTimeout(downloadTimeoutSeconds * 1000)
                .build();
        HttpGet httpGet = new HttpGet(task.getArchive_url());
        final String tempOutFile = getTempOutFile(task);
        try(CloseableHttpClient client = HttpClientBuilder.create().setDefaultSocketConfig(socketConfig).build()) {
            dbHelper.updateTaskStatusAndReason(task.getId(), "FETCHING", "");

            HttpEntity responseEntity = client.execute(httpGet).getEntity();
            checkContentLength(task, responseEntity);
            checkContentType(task, responseEntity);
            try (InputStream inputStream = responseEntity.getContent()) {
                Files.copy(inputStream, Paths.get(tempOutFile), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (SocketTimeoutException e) {
            FileUtils.deleteQuietly(new File(tempOutFile));
            throw new IOException(String.format("#Scheduler#%d#fetching timeout: %ds", task.getId(), downloadTimeoutSeconds));
        }
        return new File(tempOutFile);
    }

    private void checkContentType(Task task, HttpEntity resEntity) throws DeployScheduleException {
        String contentType = resEntity.getContentType().getValue();
        if (isZipFile(task, contentType)) {
            dbHelper.updateTaskLog(task.getId(), "Project or branch not found.");
            throw new DeployScheduleException("#Scheduler#" + task.getId() + "#invalid content type: " + contentType);
        }
    }

    private void checkContentLength(Task task, HttpEntity resEntity) throws DeployScheduleException {
        long contentLength = resEntity.getContentLength();
        // 1 << 20 = 1M
        long limit = sizeLimit << 20;
        if (contentLength > limit) {
            dbHelper.updateTaskLog(task.getId(), "Site archive size is more than " + sizeLimit + "M.");
            throw new DeployScheduleException("#Scheduler#" + task.getId() + "#Archive too big#size: {}" + contentLength);
        }
    }

    private boolean isZipFile(Task task, String contentType) {
        return !contentType.contains("octet-stream") &&
                !contentType.contains("zip") &&
                !task.getArchive_url().endsWith(".zip");
    }
```