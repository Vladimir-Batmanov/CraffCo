# Проект "Граф для расчета марковских цепей"

## Описание

Этот проект представляет собой веб-приложение для создания и визуализации графов. Вершины графа могут соединяться друг с другом, а также с самими собой, с указанием вероятностей переходов. В будущем этот граф будет использоваться для расчета марковских цепей на серверной стороне.

## Функциональные возможности

- Создание вершин графа с произвольным размещением на экране.
- Соединение вершин графа стрелками с указанием вероятностей переходов.
- Создание петельных соединений (вершина соединяется сама с собой).
- Удаление выбранных вершин.
- Удаление всех вершин.
- Отображение всех связей между вершинами с вероятностями.

## Установка

### Установка Node.js и npm

1. **Скачайте и установите Node.js**:
   
   Перейдите на [официальный сайт Node.js](https://nodejs.org/) и скачайте установщик для вашей операционной системы. Рекомендуется скачать LTS (Long Term Support) версию, так как она является наиболее стабильной.

   - Для Windows: запустите скачанный `.msi` файл и следуйте инструкциям установщика.
   - Для macOS: запустите скачанный `.pkg` файл и следуйте инструкциям установщика.
   - Для Linux: следуйте инструкциям на сайте для вашей дистрибуции (обычно это команды для установки через пакетный менеджер, такие как `apt` или `yum`).

2. **Проверьте установку Node.js и npm**:
   
   После завершения установки откройте терминал или командную строку и введите следующие команды, чтобы убедиться, что Node.js и npm установлены правильно:

   ```bash
   node -v
   npm -v
   ```

Эти команды должны вывести установленные версии Node.js и npm.

## Установка зависимостей и запуск проекта

1. Склонируйте репозиторий:

   ```bash
   git clone https://github.com/Vladimir-Batmanov/CraffCo.git
   cd CraffCo
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите приложение:

   ```bash
   npm start
   ```

## Использование

1. Для создания вершины кликните на пустое место в области графа.
2. Для соединения вершин выберите вершины, поочередно кликая на них, затем нажмите кнопку "Соединить вершины". Введите вероятность перехода в открывшемся модальном окне.
3. Для создания петли выберите одну вершину и нажмите кнопку "Соединить вершины". Введите вероятность перехода в открывшемся модальном окне.
4. Для удаления выбранных вершин нажмите кнопку "Удалить вершину".
5. Для удаления всех вершин нажмите кнопку "Удалить все вершины".

## Структура проекта

```
graph-app/
│
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Graph/
│   │   │   ├── Graph.css
│   │   │   ├── Graph.js
│   │   │
│   │   ├── GraphBlock/
│   │   │   ├── GraphBlock.css
│   │   │   ├── GraphBlock.js
│   │   │
│   │   ├── GraphControls/
│   │   │   ├── GraphControls.css
│   │   │   ├── GraphControls.js
│   │   │
│   │   ├── Results/
│   │       ├── Results.css
│   │       ├── Results.js
│   │
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   ├── setupTests.js
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

### Описание основных файлов и директорий:

- **components/Graph/**: Компоненты для отображения и управления графом.
  - `Graph.css`: Стили для компонента `Graph`.
  - `Graph.js`: Основной компонент для отображения и управления графом.
  
- **components/GraphBlock/**: Компонент, объединяющий `Graph` и `GraphControls`.
  - `GraphBlock.css`: Стили для компонента `GraphBlock`.
  - `GraphBlock.js`: Компонент для управления графом и его контролами.
  
- **components/GraphControls/**: Компонент для управления графом (добавление, удаление вершин и соединений).
  - `GraphControls.css`: Стили для компонента `GraphControls`.
  - `GraphControls.js`: Компонент управления графом.
  
- **components/Results/**: Компонент для отображения результатов.
  - `Results.css`: Стили для компонента `Results`.
  - `Results.js`: Компонент для отображения результатов расчетов.
  
- **App.css**: Основные стили для приложения.
- **App.js**: Основной компонент приложения.
- **index.css**: Дополнительные стили.
- **index.js**: Точка входа в приложение.
- **reportWebVitals.js**: Скрипт для измерения производительности.
- **setupTests.js**: Настройки для тестирования.

## Будущие доработки

- Реализация серверной части для расчета марковских цепей.
- Интеграция с сервером для передачи данных графа и получения результатов расчета.

## Вклад

Если у вас есть идеи по улучшению проекта, вы можете создать pull request или открыть issue в репозитории.
