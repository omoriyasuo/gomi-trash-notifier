## Gomi Day Notifier

ゴミ出しの前日に通知してくれるLINEbotです。
使用するには、後述するLINE DevelopersとAWSのセットアップが必要です。

### なぜ作ったか？
- ゴミを出さないと、ゴミ箱にゴミが溜まり、部屋が臭くなる。
- ゴミ出しの曜日を覚えるのが面倒。
- ギリギリまでゴミを溜めてから捨てる習慣だと、ビニール袋を結ぶ時、大変だし臭い。

その結果、定期的にゴミを捨てれば、溜まらずに臭くなくなることに気づいた。（自明）

### 実装機能
- **ゴミ出しの前日にどのゴミを出すのか通知してくれる**、これだけです。

**ゴミの種類(編集可能)**
  - 燃えるゴミ: 月曜日、金曜日
  - プラスティックゴミ: 土曜日
  - ペットボトル、ビン、缶ゴミ: 木曜日
  - 資源ゴミ: 水曜日

### 技術スタック
- Node.js (v12.x または v10.x)
- TypeScript
- AWS(Lambda, CloudWatch Events)
- LINE Developers (Messaging API)

### 準備

#### LINE Developers (Messaging API)
1. [LINE Developers](https://developers.line.biz/ja/)にアクセスして、LINEアカウントでログインします。
2. 新規プロバイダーを作成します。(プロバイダーとは、アプリを提供する組織のことです。ご自身のお名前や企業の名前を入力するものです)
<img width="460" alt="スクリーンショット 2021-01-31 22 58 12" src="https://user-images.githubusercontent.com/48271813/106398168-b3b5d200-6454-11eb-80ce-fca13f8dd42b.png">
3. チャネルを作成します。(チャネルは実際のLINEbotの名前になります)
Messaging APIで作成します。
<img width="342" alt="スクリーンショット 2021-01-31 22 54 47" src="https://user-images.githubusercontent.com/48271813/106398236-07c0b680-6455-11eb-8a6c-d6f2e9b1d335.png">
4. チャネル名(Channel name)やチャネル説明(Channel description)などの必須項目を記入します。
<img width="500" alt="スクリーンショット 2021-01-31 23 00 11" src="https://user-images.githubusercontent.com/48271813/106398272-42c2ea00-6455-11eb-8842-3c87e2626bd7.png">

5. 記入を完了し、無事作成したら、`Your user ID`と`Channel access token`を確認してどこかにメモしてください。`Channel access token`は、`Messaging API`タブの一番下にある`Channel access token`を発行すると確認できます。

#### AWS (Lambda, CloudWatch)
[AWS](https://aws.amazon.com/jp/)にログインします。
まず、Lambda関数を作成します。
<br/>
<img width="1342" alt="スクリーンショット 2021-02-01 0 00 27" src="https://user-images.githubusercontent.com/48271813/106398512-908c2200-6456-11eb-961e-ae063b897b99.png">
次に、トリガーをCloudWatchで設定します。
<br/>
<img width="1342" alt="スクリーンショット 2021-02-01 0 41 30" src="https://user-images.githubusercontent.com/48271813/106398582-f5477c80-6456-11eb-96e4-fd1fad2bed2e.png">
私はスケジュール式でcron式を書きました。（時間はUTCで、日本は9時間進んでいるので注意）
`cron(0 14 * * ? *)`なので、夜11時にLambda関数が実行されることになります。
最後に、環境変数を登録します。
先ほど、LINE Developers (Messaging API)で取得した`Your user ID`と`Channel access token`をLambda関数の環境変数に登録してください。


### デプロイ
自分の家のゴミ出しの曜日を確認して、`src/message.ts`を開き編集しても大丈夫です。

```typescript
const infos = [
  {
    message: '明日は「燃えるゴミ」を捨てる日です！',
    days: [Monday, Friday]
  },
  {
    message: '明日は「プラスチックゴミ」を捨てる日です！',
    days: [Saturday]
  },
  {
    message: '明日は「ペットボトル、ビン、缶ゴミ」を捨てる日です！',
    days: [Thursday]
  },
  {
    message: '明日は「資源ゴミ」を捨てる日です！',
    days: [Wednesday]
  }
];
```
Lambdaにデプロイするためにzipにします。

```sh
$ chmod +x ./script/zip.sh
$ ./script/zip.sh
```

`/dist`フォルダに`lambda.zip`ファイルがあるので、それをLambdaコンソール画面の`Actions`からアップロードします。

ここまで完成できたら、LINEbotをご自分のスマホで友達に追加してください。
方法は、LINE Developersの`Messaging API`タブのQRコードを使って登録するのが簡単です。というか、それ以外の方法を知らない:smile:
<img width="250" src="https://user-images.githubusercontent.com/48271813/106399302-2c1f9180-645b-11eb-9775-5b7410563f29.png">
