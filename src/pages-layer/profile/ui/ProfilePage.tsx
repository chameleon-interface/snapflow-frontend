// import { getTranslations } from 'next-intl/server';

export async function ProfilePage() {
  // const t = await getTranslations('Pages');

  return (
    <section>
      <section>
        <section>{/*<img src="#" alt="photo avatar" />*/}</section>
        <section>
          <div>
            <span>username</span>
            <button>profile settings</button>
          </div>
          <div>
            <div>
              <span>folowingcounter</span>
              <span>folowing</span>
            </div>
            <div>
              <span>folowers counter</span>
              <span>folowers</span>
            </div>
            <div>
              <span>publicationscounter</span>
              <span>publications</span>
            </div>
          </div>
          <div>
            <span>text about user</span>
          </div>
        </section>
      </section>

      <section>
        {/*здесь будут посты точнее их фото которые получим с сервера*/}
      </section>
    </section>
  );
}
