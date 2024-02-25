/**
 * リクエスト毎に上書きするconfigの型定義
 */
type customConfig = Omit<RequestInit, "Method">;

class CustomFetch {
  private constructor(commonConfig: RequestInit) {
    this._commonConfig = commonConfig;
  }

  /**
   * ベースのconfig
   */
  static readonly _baseConfig: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /**
   * 全ての通信の共通config
   */
  private _commonConfig: RequestInit = {};

  /**
   * 全ての通信の共有configを更新する関数
   */
  public updateCommonConfig = (config: RequestInit) => {
    this._commonConfig = {
      ...this._commonConfig,
      ...config,
      headers: { ...this._commonConfig.headers, ...config.headers },
    };
  };

  /**
   * ベースurl、path、クエリの連結処理
   */
  private _genUrl = (path: string, params?: { [key: string]: string }) => {
    if (!params || !Object.keys(params).length)
      return process.env.API_BASE_URL + path;

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        delete params[key];
      }
    });

    const urlSearchParams = new URLSearchParams(params);

    return process.env.API_BASE_URL + path + "?" + urlSearchParams.toString();
  };

  /**
   * 通信の共通処理
   * 全ての通信共通のconfigをマージしてfetchする（メソッドで上書きされる）
   */
  private _fetch = async <T>(
    path: string,
    config: RequestInit,
    params?: { [key: string]: string }
  ): Promise<T> => {
    const url = this._genUrl(path, params);

    const result = await fetch(url, {
      ...this._commonConfig,
      ...config,
      headers: { ...this._commonConfig.headers, ...config.headers },
    });

    return await result.json();
  };

  /**
   * fetcherの作成
   * @param config
   * @returns
   */
  static create = (config?: RequestInit) => {
    return new CustomFetch(
      {
        ...this._baseConfig,
        ...config,
        headers: { ...this._baseConfig.headers, ...config?.headers },
      } || {}
    );
  };

  /**
   * get
   */
  public get = async <T>(
    path: string,
    config: customConfig,
    params?: { [key: string]: string }
  ): Promise<T> => {
    return await this._fetch<T>(path, { ...config, method: "GET" }, params);
  };

  /**
   * post
   */
  public post = (path: string, config: customConfig) => {
    return this._fetch(path, { ...config, method: "POST" });
  };

  /**
   * put
   */
  public put = (path: string, config: customConfig) => {
    return this._fetch(path, { ...config, method: "PUT" });
  };

  /**
   * delete
   */
  public delete = (path: string, config: customConfig) => {
    return this._fetch(path, { ...config, method: "DELETE" });
  };
}

export const instance = CustomFetch.create();
